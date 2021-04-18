import BaseController from '../BaseController'
import FileService from '../../service/FileService'
import FileValidator from '../../validator/FileValidator'
export default class TestController extends BaseController {
  async test (ctx) {
    const { file } = await new FileValidator(ctx).file()
    const path = await new FileService(ctx).uploadResource(file)
    this.success(path)
  }
}
