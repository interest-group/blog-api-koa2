import BaseController from '../BaseController'

import UserValidator from '../../validator/UserValidator'
import UserService from '../../service/UserService'

export default class UserController extends BaseController {
  // 注册
  async register (ctx) {
    const params = await new UserValidator(ctx).register()
    await new UserService().register(params)
    this.success(null)
  }

  // 登录
  async login (ctx) {
    const params = await new UserValidator(ctx).login()
    const user = await new UserService().login(params)
    this.success(user)
  }

  // 获取用户信息
  async info (ctx) {
    const { id, username, nickname } = ctx.state.user
    this.success({ id, username, nickname })
  }
}
