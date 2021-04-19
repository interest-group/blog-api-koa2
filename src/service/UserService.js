import Authorization from '../core/Authorization'
import BaseService from './BaseService'
import UserDao from '../dao/UserDao'
import UserProfileModel from '../models/UserProfileModel'

export default class UserService extends BaseService {
  // 注册
  async register ({ nickname, username, password }) {
    return this.transaction(async () => {
      const user = await UserDao.createUser({ nickname, username, password })
      const userInfo = this.toUserInfo(user.get())
      const token = this.signToken(userInfo)
      return { userInfo, token }
    })
  }

  // 登录
  async login ({ username, password }) {
    const user = await UserDao.verifyPassword(username, password)
    const userInfo = this.toUserInfo(user.get())
    const token = this.signToken(userInfo)
    return { userInfo, token }
  }

  // 退出登录
  async logout (tokenValue) {
    // 撤销用户当前令牌
    await new Authorization().revoke(tokenValue)
  }

  // 获取用户摘要
  async getUserProfile (id) {
    return await UserDao.getUserInfo(id)
  }

  // 更新密码
  async updatePassword (tokenValue, { password, newPassword }) {
    const { id } = await UserDao.verifyPassword(tokenValue.username, password)
    await this.transaction(async () => {
      await UserProfileModel.update({ password: newPassword }, { where: { id } })
    })
    // 撤销用户所有令牌
    await new Authorization().revokeAll(tokenValue)
  }

  // 裁剪字段
  // 只保留 id, username, nickname, role
  toUserInfo ({ id, username, nickname, role }) {
    return { id, username, nickname, role }
  }

  // 签发token
  signToken (user) {
    const userInfo = this.toUserInfo(user)
    return new Authorization().sign(userInfo)
  }
}
