import config from 'config'
import Exception from '../core/Exception'
import { mergeBody } from '../utils/tools'

class HttpException {
  constructor (ctx) {
    this.ctx = ctx
  }

  // 入口
  async handler (next) {
    try {
      await next()
    } catch (error) {
      return this.catchException(error)
    }
    if (this.ctx.status !== 200) {
      this.onStatusException()
    }
  }

  // 捕获错误
  catchException (error) {
    if (config.get('server.consoleError')) {
      console.log(error)
    }
    // 自定义错误
    if (error instanceof Exception) {
      return this.success(error.status, error.data, error.message)
    }
    // 程序错误
    return this.success(500, null, error.message)
  }

  // 状态异常
  onStatusException () {
    switch (this.ctx.status) {
      // 鉴权失败
      case 401:
        return this.success(401, null, 'protected resource, use Authorization header to get access.')
      // not found
      case 404:
        return this.success(404, null, 'resource not found.')
      // not allowed
      case 405:
        return this.success(405, null, 'method not allowed.')
      // 未知错误
      default:
        return this.success(503, null, 'unknown error.')
    }
  }

  success (status, data, message) {
    this.ctx.status = 200
    mergeBody(this.ctx, { status, data, message })
  }
}

// 异常中间件
export default function () {
  return (ctx, next) => new HttpException(ctx).handler(next)
}
