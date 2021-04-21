import BaseController from '../BaseController'

import UserInfoValidator from '../../validator/UserInfoValidator'
import UserInfoService from '../../service/UserInfoService'

export default class UserInfoController extends BaseController {
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
    const params = await new UserInfoValidator(ctx).register()
    const { userInfo, token } = await new UserInfoService(ctx).register(params)
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
    const params = await new UserInfoValidator(ctx).login()
    const { userInfo, token } = await new UserInfoService(ctx).login(params)
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
   * {
   *   "status": 200,
   *   "data": {
   *     "id": 5,
   *     "status": 1,
   *     "nickname": "brandon",
   *     "username": "focus131234",
   *     "avatar": null,
   *     "gender": null,
   *     "email": null,
   *     "role": null,
   *     "createTime": "2021-04-19T11:36:01.000Z",
   *     "userId": 5,
   *     "userSignature": null,
   *     "articleCount": 0,
   *     "commentCount": 0,
   *     "likeCount": 0,
   *     "followCount": 0,
   *     "fansCount": 0,
   *     "points": 0,
   *     "remark": null
   *   },
   *   "message": "operation success.",
   *   "uid": 2
   * }
   */
  async getUserInfo (ctx) {
    const { id } = await new UserInfoValidator(ctx).id('params')
    const userInfo = await new UserInfoService(ctx).getUserInfo(id)
    this.success(userInfo)
  }
}
