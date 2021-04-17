import BaseController from '../BaseController'

export default class UserController extends BaseController {
  async test (ctx) {
    this.success(ctx.state.user)
  }
}
