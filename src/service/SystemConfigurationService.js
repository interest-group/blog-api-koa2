import BaseService from './BaseService'
import SystemConfigurationDao from '../dao/SystemConfigurationDao'
// import SystemConfigurationModel from '../models/SystemConfigurationModel'

export default class SystemConfigurationService extends BaseService {
  /**
   * 获取配置项列表
   * **/
  async getConfiguration (paginate) {
    return new SystemConfigurationDao().queryConfiguration(paginate)
  }

  /**
   * 创建配置项
   * **/
  async createConfiguration (data) {
    const dao = new SystemConfigurationDao()
    const result = await dao.getConfiguration({ value: data.value })
    if (result) {
      this.throwException(`configuration "${data.value}" already exist.`)
    }
    return this.transaction(async () => {
      return dao.createConfiguration(data)
    })
  }

  /**
   * 更新配置项
   * **/
  async updateConfiguration (id, data) {
    const dao = new SystemConfigurationDao()
    const result = await dao.getConfiguration({ id })
    if (!result) {
      this.throwException('configuration not found.', 404)
    }
    return this.transaction(async () => {
      return dao.updateConfiguration(data, { id })
    })
  }

  /**
   * 创建配置项
   * **/
  async getConfigurationParam () {
    return new SystemConfigurationDao().getConfigurationParam()
  }
}
