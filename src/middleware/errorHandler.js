function errorHandler (ctx, next) {
  return next().catch((err) => {
    switch (ctx.status) {
      // 身份认证
      case 401:
        ctx.status = 200
        ctx.body = {
          status: 401,
          message: 'Protected resource, use Authorization header to get access.'
        }
        break
      // 404
      case 404:
        ctx.status = 200
        ctx.body = {
          status: 404,
          message: 'Resource not found.'
        }
        break
      default:
        throw err
    }
  })
}

export default () => errorHandler
