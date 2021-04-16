import Exception from '../core/Exception'
import sequelize from '../core/sequelize'

export default class BaseService {
  // 事务
  transaction (callback) {
    return sequelize.transaction(callback)
  }

  // 抛出异常
  throwException (message, status) {
    throw new Exception({ message, status })
  }
}
