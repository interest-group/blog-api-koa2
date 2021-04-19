import BaseService from './BaseService'
import SystemDao from '../dao/SystemDao'

export default class SystemService extends BaseService {
  /**
   * 获取配置项列表
   * **/
  async getConfigurationList () {
    return SystemDao.getConfigurationList()
  }

  /**
   * 获取配置项
   * **/
  async getConfiguration (id) {
    return SystemDao.getConfiguration(id)
  }

  /**
   * 创建配置项
   * **/
  async createConfiguration () {
    return SystemDao.getConfigurationList()
  }
}
