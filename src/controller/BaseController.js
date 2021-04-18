import Exception from '../core/Exception'
import { getValue, mergeBody } from '../utils/tools'

export default class BaseController {
  constructor (ctx) {
    this.ctx = ctx
  }

  // 成功回调
  success (data, message) {
    this.ctx.status = 200
    mergeBody(this.ctx, {
      status: 200,
      data: getValue(data, null),
      message: getValue(message, 'operation success.')
    })
  }

  // 失败回调
  error (message, status) {
    throw new Exception({
      status: getValue(status, 400),
      data: null,
      message: getValue(message, 'operation failed.')
    })
  }
}
