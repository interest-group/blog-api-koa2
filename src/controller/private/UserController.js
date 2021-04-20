import BaseController from '../BaseController'

import UserValidator from '../../validator/UserValidator'
import UserService from '../../service/UserService'

export default class UserController extends BaseController {
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

  // 获取token信息
  async getTokenInfo (ctx) {
    const userInfo = new UserService(ctx).toUserInfo(ctx.state.user)
    this.success(userInfo)
  }

  // 获取用户摘要
  async getUserInfo (ctx) {
    const { id } = await new UserValidator(ctx).paramsId()
    const userInfo = await new UserService(ctx).getUserInfo(id)
    this.success(userInfo)
  }
}
