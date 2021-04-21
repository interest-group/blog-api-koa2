import BaseController from '../BaseController'
import SystemConfigurationService from '../../service/SystemConfigurationService'
import SystemConfigurationValidator from '../../validator/SystemConfigurationValidator'

export default class SystemConfigurationController extends BaseController {
  /**
   * @apiName     配置项列表
   * @apiGroup    {private}  system
   * @apiUrl      {POST}    /system/configuration
   * @apiParam    pageIndex | Number | 页码 | 1
   * @apiParam    pageSize | Number | 页长 | 1
   */
  async getConfiguration (ctx) {
    const paginate = await new SystemConfigurationValidator(ctx).paginate('query')
    const data = await new SystemConfigurationService(ctx).getConfiguration(paginate)
    this.success(data)
  }

  /**
   * @apiName     创建配置项
   * @apiGroup    {private}  system
   * @apiUrl      {POST}    /system/configuration
   * @apiBody     type | Number | 类型 | 1
   * @apiBody     name | String | 配置项名称 | 1
   * @apiBody     value | String | 配置项值 | 1
   * @apiBody     describe | String | 配置项描述
   */
  async createConfiguration (ctx) {
    const data = await new SystemConfigurationValidator(ctx).configuration()
    await new SystemConfigurationService(ctx).createConfiguration(data)
    this.success(null)
  }

  /**
   * @apiName     编辑配置项
   * @apiGroup    {private}  system
   * @apiUrl      {POST}    /system/configuration/:id
   * @apiParam    id | Number | 配置项id | 1
   * @apiBody     type | Number | 类型 | 1
   * @apiBody     name | String | 配置项名称 | 1
   * @apiBody     value | String | 配置项值 | 1
   * @apiBody     describe | String | 配置项描述
   */
  async updateConfiguration (ctx) {
    const { id } = await new SystemConfigurationValidator(ctx).id('params')
    const data = await new SystemConfigurationValidator(ctx).configuration()
    await new SystemConfigurationService(ctx).updateConfiguration(id, data)
    this.success(null)
  }

  /**
   * @apiName     配置参数列表
   * @apiGroup    {private}  system
   * @apiUrl      {POST}    /system/configuration/:id
   * @apiParam    id | Number | 配置项id | 1
   */
  async getConfigurationParam (ctx) {
    const { id } = await new SystemConfigurationValidator(ctx).id('params')
    const data = await new SystemConfigurationService(ctx).getConfiguration(id)
    this.success(data)
  }
}
