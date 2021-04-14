// 异常中间件
function onException (ctx, next) {
  return next().catch((err) => {
    if (err.status) {
      return onHttpException(ctx, err)
    }
    switch (ctx.status) {
      case 401:
        return onAuthorizationException(ctx, err)
      case 404:
        return onNotFoundException(ctx, err)
      default:
        return otherException(ctx, err)
    }
  })
}

// 自定义操作失败
function onHttpException (ctx, err) {
  ctx.status = 200
  ctx.body = {
    status: err.status,
    message: err.message
  }
}

// 身份认证 异常
function onAuthorizationException (ctx, err) {
  ctx.status = 200
  ctx.body = {
    status: 401,
    message: 'Protected resource, use Authorization header to get access.'
  }
}

// 身份认证 异常
function onNotFoundException (ctx, err) {
  ctx.status = 200
  ctx.body = {
    status: 404,
    message: 'Resource not found.'
  }
}

// 其他错误
function otherException (ctx, err) {
  ctx.status = 200
  ctx.body = {
    status: 500,
    message: err.message
  }
}

export default () => onException
