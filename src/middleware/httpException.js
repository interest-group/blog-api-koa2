// 异常中间件
async function httpException (ctx, next) {
  try {
    await next()
  } catch (err) {
    handler(ctx, err)
  }
}

// 异常处理
function handler (ctx, err) {
  // 自定义错误
  if (err && err.httpException) {
    return onHttpException(ctx, err)
  }
  console.log(ctx.status)
  switch (ctx.status) {
    case 401:
      // 鉴权失败
      return onAuthorizationException(ctx, err)
    case 404:
      // 404
      return onNotFoundException(ctx, err)
    default:
      return serverException(ctx, err)
  }
}

// 自定义错误
function onHttpException (ctx, err) {
  ctx.status = 200
  ctx.body = {
    status: err.status,
    data: err.data,
    message: err.message
  }
}

// 鉴权失败
function onAuthorizationException (ctx, err) {
  ctx.status = 200
  ctx.body = {
    status: 401,
    data: null,
    message: 'protected resource, use Authorization header to get access.'
  }
}

// 404
function onNotFoundException (ctx, err) {
  ctx.status = 200
  ctx.body = {
    status: 404,
    data: null,
    message: 'resource not found.'
  }
}

// 其他错误
function serverException (ctx, err) {
  ctx.status = 200
  ctx.body = {
    status: 500,
    data: null,
    message: err ? err.message : 'unknown error.'
  }
}

export default function () {
  return httpException
}
