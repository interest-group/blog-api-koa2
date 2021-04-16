import Exception from '../core/Exception'

export default class Dao {
  // 抛出异常
  static throwException (message, status) {
    throw new Exception({ message, status })
  }
}
