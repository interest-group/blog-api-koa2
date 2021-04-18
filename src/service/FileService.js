import fs from 'fs'
import path from 'path'
import qiniu from 'qiniu'
import BaseService from './BaseService'
import fileCfg from '../config/file'
import { getRedis, setRedis } from '../core/redis'
import { timestamp } from '../utils/tools'

export default class FileService extends BaseService {
  // 文件上传至 Node服务器
  async uploadResource (file) {
    // 新文件名
    const fileName = path.basename(file.path) + path.extname(file.name)
    // 文件存放路径
    const filePath = path.join(fileCfg.uploadDir, fileName)
    // 创建可读流
    const reader = fs.createReadStream(file.path)
    // 创建可写流
    const upStream = fs.createWriteStream(filePath)
    // 删除文件
    reader.on('end', () => fs.unlinkSync(file.path))
    // 可读流通过管道写入可写流
    reader.pipe(upStream)
    return fileCfg.resourcePath + fileName
  }

  // 文件上传至 七牛服务器
  async uploadQiniu (file) {
    // 新文件名
    const fileName = path.basename(file.path) + path.extname(file.name)
    const { token } = await this.getQiniuUploadToken()
    // 上传
    const { key } = await this.qiniuUpload(token, fileName, file.path)
    return fileCfg.qiniuHost + key
  }

  // 获取七牛上传token
  async getQiniuUploadToken () {
    const redisName = 'QINIU_UPLOAD_TOKEN'
    let data = await getRedis(redisName)
    if (!data) {
      const mac = new qiniu.auth.digest.Mac(fileCfg.qiniuAccessKey, fileCfg.qiniuSecretKey)
      const putPolicy = new qiniu.rs.PutPolicy({
        scope: fileCfg.qiniuBucket,
        expires: fileCfg.qiniuExpires + 10 // 加10秒误差
      })
      const token = putPolicy.uploadToken(mac)
      data = { token, expires: timestamp() + fileCfg.qiniuExpires }
      await setRedis(redisName, data, fileCfg.qiniuExpires)
    }
    return data
  }

  // 七牛上传
  qiniuUpload (token, fileName, filePath) {
    return new Promise((resolve, reject) => {
      const config = new qiniu.conf.Config()
      config.zone = qiniu.zone[fileCfg.qiniuZone]
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
