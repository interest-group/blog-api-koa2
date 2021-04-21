import BaseController from '../BaseController'

import UserInfoValidator from '../../validator/UserInfoValidator'
import UserInfoService from '../../service/UserInfoService'

export default class UserInfoController extends BaseController {
  /**
   * @apiName     获取当前用户信息
   * @apiGroup    {private}  user
   * @apiUrl      {GET}    /user/info
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
   *   "uid": 5
   * }
   */
  async getTokenInfo (ctx) {
    const userInfo = new UserInfoService(ctx).publicUserInfo(ctx.state.user)
    this.success(userInfo)
  }

  /**
   * @apiName     退出登录
   * @apiGroup    {private}  user
   * @apiUrl      {GET}    /user/logout
   * @apiResponse
   * {
   *   "status": 200,
   *   "data": null,
   *   "message": "operation success."
   * }
   */
  async logout (ctx) {
    await new UserInfoService(ctx).logout(ctx.state.user)
    ctx.state.user = null
    this.success()
  }

  /**
   * @apiName     修改密码
   * @apiGroup    {private}  user
   * @apiUrl      {GET}    /user/password
   * @apiBody     password | String | 原密码 | 1
   * @apiBody     newPassword | String | 新密码 | 1
   * @apiResponse
   * {
   *   "status": 200,
   *   "data": null,
   *   "message": "operation success."
   * }
   */
  async updatePassword (ctx) {
    const params = await new UserInfoValidator(ctx).updatePassword()
    const tokenValue = ctx.state.user
    await new UserInfoService(ctx).updatePassword(tokenValue, params)
    ctx.state.user = null
    this.success()
  }
}
