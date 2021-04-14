import Exception from '../core/Exception'

function success (ctx, data = null, message = 'operation success.') {
  ctx.status = 200
  ctx.body = {
    status: 200,
    data,
    message
  }
}

function error (ctx, message) {
  throw new Exception(message)
}

export default function () {
  return async function (ctx, next) {
    ctx.success = success.bind(null, ctx)
    ctx.error = error.bind(null, ctx)
    await next()
  }
}
