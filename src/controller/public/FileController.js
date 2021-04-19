import BaseController from '../BaseController'
import FileService from '../../service/FileService'
import FileValidator from '../../validator/FileValidator'
export default class FileController extends BaseController {
  // 文件上传至 Node服务器
  async uploadServer (ctx) {
    const { file } = await new FileValidator(ctx).file()
    const path = await new FileService(ctx).uploadResource(file)
    this.success(path)
  }

  // 文件上传至 OSS服务器
  async uploadOSS (ctx) {
    const { file } = await new FileValidator(ctx).file()
    const path = await new FileService(ctx).uploadQiniu(file)
    this.success(path)
  }

  // 获取文件上传 token
  async uploadToken (ctx) {
    const path = await new FileService(ctx).getQiniuUploadToken()
    this.success(path)
  }
}
