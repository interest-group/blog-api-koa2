import Exception from '../core/Exception'
import server from '../config/server'
import { mergeBody } from '../utils/tools'

class HttpException {
  async handler (ctx, next) {
    try {
      await next()
    } catch (error) {
      if (server.printException) {
        console.log(error)
      }
      return this.onException(ctx, error)
    }
    if (ctx.status !== 200) {
      this.onException(ctx)
    }
  }

  onException (ctx, error) {
    // 自定义错误
    if (error && error instanceof Exception) {
      return this.onHttpException(ctx, error)
    }
    // 鉴权失败
    if (error && error.status === 401) {
      return this.onAuthorizationException(ctx, error)
    }
    // 程序错误
    if (error) {
      return this.serverException(ctx, error)
    }
    // 404
    if (ctx.status === 404) {
      return this.onNotFoundException(ctx, error)
    }
    return this.unknownException(ctx)
  }

  // 自定义错误
  onHttpException (ctx, error) {
    this.success(ctx, error.status, error.data, error.message)
  }

  // 鉴权失败
  onAuthorizationException (ctx, error) {
    this.success(ctx, 401, null, 'protected resource, use Authorization header to get access.')
  }

  // 404
  onNotFoundException (ctx, error) {
    this.success(ctx, 404, null, 'resource not found.')
  }

  // 服务器错误
  serverException (ctx, error) {
    this.success(ctx, 500, null, error.message)
  }

  // 未知错误
  unknownException (ctx) {
    this.success(ctx, 503, null, 'unknown error.')
  }

  success (ctx, status, data, message) {
    ctx.status = 200
    mergeBody(ctx, { status, data, message })
  }
}

// 异常中间件
const httpException = new HttpException()

export default function () {
  return (ctx, next) => httpException.handler(ctx, next)
}
