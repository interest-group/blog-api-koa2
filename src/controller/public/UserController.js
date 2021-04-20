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

  /**
   *
   * My method description.  Like other pieces of your comment blocks,
   * this can span multiple lines.

   * @param {Object} config A config object
   * @param {Function} config.callback A callback function on the config object
   * @param {Boolean} [extra=false] Do extra, optional work
   * @example
   * new exampleName(function(){console.log("Hello World")})
   * @returns {Object} The constructed target object
   */

  // 登录
  async login (ctx) {
    const params = await new UserValidator(ctx).login()
    const { userInfo, token } = await new UserService(ctx).login(params)
    this.success(userInfo)
    ctx.state.user = null
    ctx.body.token = token
  }

  /**
   * @apiName 获取用户信息
   * @apiGroup User
   * @apiDescription 这是一个描述
   * @apiUrl {POST} /user/get
   * @apiParam name | String | 文章名 | 1
   * @apiParam n2ame | String | 文章名 | 1
   * @apiQuery name | String | 文章名 | 0
   * @apiBody name | String | 文章名 | 1
   * @request params
   * {
   *  "userName": "Eve"
   * }
   * @request
   * {
   *  "www": "鹅鹅鹅"
   * }
   * @response success
   * {
   *      "status": 200,
   *      "data": "/resources/uploads/upload_3dadfe86a8a9e519f77545d5befa683a.jpg",
   *      "message": "operation success."
   * }
   */

  async getUserInfo (ctx) {
    const { id } = await new UserValidator(ctx).paramsId()
    const userInfo = await new UserService(ctx).getUserInfo(id)
    this.success(userInfo)
  }
}
