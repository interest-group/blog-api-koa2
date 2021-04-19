import Dao from './Dao'
import SystemConfigurationModel from '../models/SystemConfigurationModel'
import SystemConfigurationParamModel from '../models/SystemConfigurationParamModel'

export default class SystemDao extends Dao {
  /**
   * 获取配置项列表
   * **/
  static async getConfigurationList () {
    const data = await SystemConfigurationModel.findAndCountAll({
      limit: 2,
      offset: 0
    })
    console.log(data)
    return data
  }

  /**
   * 获取配置项
   * **/
  static async getConfiguration (id) {
    return SystemConfigurationParamModel.findAll({
      where: { configurationId: id }
    })
  }

  /**
   * 创建配置项
   * **/
  async createConfiguration () {
    const value = 'value'
    const name = 'name'
    const data = await SystemConfigurationModel.findOne({ where: { value } })
    if (data) {
      SystemDao.throwException(`user "${value}" already exist.`)
    }
  }
}
