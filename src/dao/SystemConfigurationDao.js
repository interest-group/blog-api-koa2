import BaseDao from './BaseDao'
import SystemConfigurationModel from '../models/SystemConfigurationModel'
import SystemConfigurationParamModel from '../models/SystemConfigurationParamModel'

export default class SystemConfigurationDao extends BaseDao {
  // 查找配置项
  async getConfiguration (where) {
    return SystemConfigurationModel.findOne({ where })
  }

  // 查找配置项
  async queryConfiguration (paginate) {
    return SystemConfigurationModel.findAndCountAll(this.toLimit(paginate))
  }

  // 创建配置项
  async createConfiguration (data) {
    await SystemConfigurationModel.create(data)
  }

  // 更新配置项
  async updateConfiguration (data, where) {
    await SystemConfigurationModel.update(data, { where })
  }

  /**
   * 获取配置项
   * **/
  async getConfigurationParam (id) {
    return SystemConfigurationParamModel.findAll({
      where: { configurationId: id }
    })
  }
}
