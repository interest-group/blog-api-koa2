import BaseController from '../BaseController'

import UserValidator from '../../validator/UserValidator'
import UserService from '../../service/UserService'
import Authorization from '../../core/Authorization'

export default class UserController extends BaseController {
  // 注册
  async register (ctx) {
    const params = await new UserValidator(ctx).register()
    const { user, token } = await new UserService().register(params)
    this.success(user)
    ctx.body.token = token
  }

  // 登录
  async login (ctx) {
    const params = await new UserValidator(ctx).login()
    const { user, token } = await new UserService().login(params)
    this.success(user)
    ctx.body.token = token
  }

  // 获取用户信息
  async info (ctx) {
    const { id, username, nickname, role } = ctx.state.user
    this.success({ id, username, nickname, role })
  }

  // 退出登录
  async logout (ctx) {
    // 撤销当前令牌
    await new Authorization().revoke(ctx.state.user)
    ctx.state.user = null
    this.success()
  }

  // 更新密码
  async updatePassword (ctx) {
    const params = await new UserValidator(ctx).updatePassword()
    await new UserService().updatePassword(params)
    // 撤销用户所有令牌
    await new Authorization().revokeAll(ctx.state.user)
    this.success()
  }
}
