import BaseController from '../BaseController'

import UserValidator from '../../validator/UserValidator'
import UserService from '../../service/UserService'

export default class UserController extends BaseController {
  // 注册
  async register (ctx) {
    const params = await new UserValidator(ctx).register()
    const { userInfo, token } = await new UserService(ctx).register(params)
    this.success(userInfo)
    ctx.state.user = null
    ctx.body.token = token
  }

  // 登录
  async login (ctx) {
    const params = await new UserValidator(ctx).login()
    const { userInfo, token } = await new UserService(ctx).login(params)
    this.success(userInfo)
    ctx.state.user = null
    ctx.body.token = token
  }

  // 获取用户信息
  async info (ctx) {
    const userInfo = new UserService(ctx).toUserInfo(ctx.state.user)
    this.success(userInfo)
  }

  // 退出登录
  async logout (ctx) {
    await new UserService(ctx).logout(ctx.state.user)
    ctx.state.user = null
    this.success()
  }

  // 更新密码
  async updatePassword (ctx) {
    const params = await new UserValidator(ctx).updatePassword()
    const tokenValue = ctx.state.user
    await new UserService(ctx).updatePassword(tokenValue, params)
    ctx.state.user = null
    this.success()
  }
}
