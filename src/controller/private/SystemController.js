import BaseController from '../BaseController'
import SystemService from '../../service/SystemService'
import SystemValidator from '../../validator/SystemValidator'

export default class SystemController extends BaseController {
  // 配置项列表
  async getConfigurationList (ctx) {
    const page = await new SystemValidator(ctx).configuration()
    console.log(page)
    const data = await new SystemService(ctx).getConfigurationList()
    this.success(data)
  }

  // 配置项列表
  async getConfiguration (ctx) {
    const { id } = await new SystemValidator(ctx).paramsId()
    const data = await new SystemService(ctx).getConfiguration(id)
    this.success(data)
  }

  // 创建一个配置项
  async createConfiguration (ctx) {
  }
}
