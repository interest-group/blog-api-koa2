import UserValidator from '../../validator/UserValidator'
import User from '../../dao/User'
export const register = async (ctx) => {
  const params = await new UserValidator(ctx).register()
  await User.create(params)
  ctx.success(null)
}
