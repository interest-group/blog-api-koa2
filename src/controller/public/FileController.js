import BaseController from '../BaseController'
import FileService from '../../service/FileService'
import FileValidator from '../../validator/FileValidator'
export default class FileController extends BaseController {
  /**
   * @apiName     文件上传(服务器)
   * @apiGroup    {public}  file
   * @apiUrl      {POST}    /file/upload/server
   * @apiBody     file | File | 上传文件 | 1
   * @apiResponse
   * {
   *   "status": 200,
   *   "data": "/resources/uploads/upload_3dadfe86a8a9e519f77545d5befa683a.jpg",
   *   "message": "operation success."
   * }
   */
  async uploadServer (ctx) {
    const { file } = await new FileValidator(ctx).file()
    const path = await new FileService(ctx).uploadResource(file)
    this.success(path)
  }

  /**
   * @apiName     文件上传(OSS)
   * @apiGroup    {public}  file
   * @apiUrl      {POST}    /file/upload/oss
   * @apiBody     file | File | 上传文件 | 1
   * @apiResponse
   * {
   *   "status": 200,
   *   "data": "http://oss.focus.com/upload_3dadfe86a8a9e519f77545d5befa683a.jpg",
   *   "message": "operation success."
   * }
   */
  async uploadOSS (ctx) {
    const { file } = await new FileValidator(ctx).file()
    const path = await new FileService(ctx).uploadQiniu(file)
    this.success(path)
  }

  /**
   * @apiName     文件上传(客户端)
   * @apiGroup    {public}  file
   * @apiUrl      {POST}    https://upload-z2.qiniup.com
   * @apiBody     file | File | 上传文件 | 1
   * @apiBody     token | String | oss令牌 | 1
   * @apiBody     key | String | 文件名
   * @apiResponse
   * {
   *   "hash": "ImJsb2ctbm9kZSIsImRlYWRsaW",
   *   "key": "ImJsb2ctbm9kZSIsImRlYWRsaW"
   * }
   */
  /**
   * @apiName     获取 OSS token (用于客户端上传)
   * @apiGroup    {public}  file
   * @apiUrl      {POST}    /file/upload/token
   * @apiResponse
   * {
   *   "status": 200,
   *   "data": {
   *     "token": "ImJsb2ctbm9kZSIsImRlYWRsaW5lIjoxNjE4ODE5MzAxfQ==",
   *     "expires": 1618819291
   *   },
   *   "message": "operation success."
   * }
   */
  async uploadToken (ctx) {
    const path = await new FileService(ctx).getQiniuUploadToken()
    this.success(path)
  }
}
