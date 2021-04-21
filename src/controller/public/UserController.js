import BaseController from '../BaseController'

import UserValidator from '../../validator/UserValidator'
import UserService from '../../service/UserService'

export default class UserController extends BaseController {
  /**
   * @apiName     用户注册
   * @apiGroup    {public}  user
   * @apiUrl      {POST}    /user/register
   * @apiBody     nickname | String | 昵称 | 1
   * @apiBody     username | String | 账号 | 1
   * @apiBody     password | String | 密码 | 1
   * @apiRequest
   * {
   *   "nickname": "focus",
   *   "username": "focus",
   *   "password": "focus123"
   * }
   * @apiResponse
   * {
   *   "status": 200,
   *   "data": {
   *     "id": 5,
   *     "username": "focus",
   *     "nickname": "focus",
   *     "role": 1
   *   },
   *   "message": "operation success.",
   *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJkZW1vIiwibmlja25hbWUiOiJmb2N1cyIsInJvbGUiOjEsImlhdCI6MTYxODY3MzIzMCwiZXhwIjoxNjE4ODQ2MDMwfQ.QKtOB8L4usa5OEa_dUK5alNlapGzY-7B7rD6PvjB-JM"
   * }
   */
  async register (ctx) {
    const params = await new UserValidator(ctx).register()
    const { userInfo, token } = await new UserService(ctx).register(params)
    this.success(userInfo)
    ctx.state.user = null
    ctx.body.token = token
  }

  /**
   * @apiName     登录
   * @apiGroup    {public}  user
   * @apiUrl      {POST}    /user/login
   * @apiBody     username | String | 账号 | 1
   * @apiBody     password | String | 密码 | 1
   * @apiRequest
   * {
   *   "username": "focus",
   *   "password": "focus123"
   * }
   * @apiResponse
   * {
   *   "status": 200,
   *   "data": {
   *     "id": 5,
   *     "username": "focus",
   *     "nickname": "focus",
   *     "role": 1
   *   },
   *   "message": "operation success.",
   *   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwidXNlcm5hbWUiOiJkZW1vIiwibmlja25hbWUiOiJmb2N1cyIsInJvbGUiOjEsImlhdCI6MTYxODY3MzIzMCwiZXhwIjoxNjE4ODQ2MDMwfQ.QKtOB8L4usa5OEa_dUK5alNlapGzY-7B7rD6PvjB-JM"
   * }
   */
  async login (ctx) {
    const params = await new UserValidator(ctx).login()
    const { userInfo, token } = await new UserService(ctx).login(params)
    this.success(userInfo)
    ctx.state.user = null
    ctx.body.token = token
  }

  /**
   * @apiName     获取用户信息
   * @apiGroup    {public}  user
   * @apiUrl      {POST}    /user/info/:id
   * @apiParam    id | Number | 用户id | 1
   * @apiResponse
   * {}
   */
  async getUserInfo (ctx) {
    const { id } = await new UserValidator(ctx).paramsId()
    const userInfo = await new UserService(ctx).getUserInfo(id)
    this.success(userInfo)
  }
}
