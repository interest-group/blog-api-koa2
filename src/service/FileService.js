import config from 'config'
import fs from 'fs'
import path from 'path'
import qiniu from 'qiniu'
import BaseService from './BaseService'
import { getRedis, setRedis } from '../core/redis'
import { timestamp } from '../utils/tools'

const uploads = path.join(__dirname, '../../resources/uploads')

export default class FileService extends BaseService {
  /**
   * 文件上传(服务器)
   * **/
  async uploadResource (file) {
    // 新文件名
    const fileName = path.basename(file.path) + path.extname(file.name)
    // 文件存放路径
    const filePath = path.join(uploads, fileName)
    // 创建可读流
    const reader = fs.createReadStream(file.path)
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    // 删除文件
    reader.on('end', () => fs.unlinkSync(file.path))
    // 可读流通过管道写入可写流
    reader.pipe(upStream)
    return config.get('upload.prefix') + fileName
  }

  /**
   * 文件上传(七牛)
   * **/
  async uploadQiniu (file) {
    // 新文件名
    const fileName = path.basename(file.path) + path.extname(file.name)
    const { token } = await this.getQiniuUploadToken()
    // 上传
    const { key } = await this.qiniuUpload(token, fileName, file.path)
    return config.get('qiniu.host') + key
  }

  /**
   * 获取 七牛上传 token
   * **/
  async getQiniuUploadToken () {
    const { accessKey, secretKey, bucket, expires } = config.get('qiniu')
    const redisName = 'QINIU_UPLOAD_TOKEN'
    let data = await getRedis(redisName)
    if (!data) {
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
      const putPolicy = new qiniu.rs.PutPolicy({
        scope: bucket,
        expires: expires + 10 // 加10秒误差
      })
      const token = putPolicy.uploadToken(mac)
      data = { token, expires: timestamp() + expires }
      await setRedis(redisName, data, expires)
    }
    return data
  }

  // 七牛上传
  qiniuUpload (token, fileName, filePath) {
    return new Promise((resolve, reject) => {
      const config = new qiniu.conf.Config()
      config.zone = qiniu.zone[config.get('qiniu.zone')]
      const formUploader = new qiniu.form_up.FormUploader(config)
      const putExtra = new qiniu.form_up.PutExtra()
      // 文件上传
      formUploader.putFile(token, fileName, filePath, putExtra, (error, result) => {
        console.log(result)
        if (error) {
          return reject(error)
        }
        if (result && result.error) {
          return reject(new Error(result.error))
        }
        fs.unlinkSync(filePath)
        resolve(result)
      })
    })
  }
}
