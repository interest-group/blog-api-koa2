import Exception from '../core/Exception'

export default class BaseService {
  // 抛出异常
  throwException (message, status) {
    throw new Exception({ message, status })
  }
}
