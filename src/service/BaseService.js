import Exception from '../core/Exception'
import sequelize from '../core/sequelize'

export default class BaseService {
  constructor (ctx) {
    this.ctx = ctx
  }

  // 事务
  transaction (callback) {
    return sequelize.transaction(callback)
  }

  // 抛出异常
  throwException (message, status) {
    throw new Exception({ message, status })
  }
}
