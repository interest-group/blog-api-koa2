import Authorization from '../core/Authorization'
import { mergeBody } from '../utils/tools'

const authorization = new Authorization()

export default function () {
  return async function (ctx, next) {
    await next()
    // 标记用户id
    const user = ctx.state.user
    if (user) {
      mergeBody(ctx, { uid: user.id })
      // 签发新token
      const token = authorization.renewal(ctx)
      if (token) {
        mergeBody(ctx, { token })
      }
    }
  }
}
