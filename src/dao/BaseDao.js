import Exception from '../core/Exception'

export default class BaseDao {
  toLimit ({ pageIndex, pageSize }) {
    return {
      limit: pageSize,
      offset: (pageIndex - 1) * pageSize
    }
  }

  // 抛出异常
  throwException (message, status) {
    throw new Exception({ message, status })
  }
}
