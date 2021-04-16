import Exception from '../core/Exception'
import { isDevelop } from '../utils/env'

class HttpException {
  async handler (ctx, next) {
    // 将 body 设置为空对象
    ctx.body = {}
    try {
      await next()
    } catch (err) {
      return this.onException(ctx, err)
    }
    if (ctx.status !== 200) {
      this.onException(ctx)
    }
  }

  onException (ctx, err) {
    // 自定义错误
    if (err && err instanceof Exception) {
      return this.onHttpException(ctx, err)
    }
    // 鉴权失败
    if (err && err.status === 401) {
      return this.onAuthorizationException(ctx, err)
    }
    // 程序错误
    if (err) {
      if (isDevelop()) {
        console.log(err)
      }
      return this.serverException(ctx, err)
    }
    // 404
    if (ctx.status === 404) {
      return this.onNotFoundException(ctx, err)
    }
    return this.unknownException(ctx)
  }

  // 自定义错误
  onHttpException (ctx, err) {
    this.success(ctx, err.status, err.data, err.message)
  }

  // 鉴权失败
  onAuthorizationException (ctx, err) {
    this.success(ctx, 401, null, 'protected resource, use Authorization header to get access.')
  }

  // 404
  onNotFoundException (ctx, err) {
    this.success(ctx, 404, null, 'resource not found.')
  }

  // 服务器错误
  serverException (ctx, err) {
    this.success(ctx, 500, null, err.message)
  }

  // 未知错误
  unknownException (ctx) {
    this.success(ctx, 503, null, 'unknown error.')
  }

  success (ctx, status, data, message) {
    ctx.status = 200
    ctx.body.status = status
    ctx.body.data = data
    ctx.body.message = message
  }
}

// 异常中间件
const httpException = new HttpException()

export default function () {
  return (ctx, next) => httpException.handler(ctx, next)
}
