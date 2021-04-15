import Authorization from '../core/Authorization'

const authorization = new Authorization()

export default function () {
  return async function (ctx, next) {
    await next()
    const user = ctx.state.user
    if (user) {
      ctx.set('Uid', user.id)
      const token = authorization.renewal(ctx)
      if (token) {
        ctx.set('Token', token)
      }
    }
  }
}
