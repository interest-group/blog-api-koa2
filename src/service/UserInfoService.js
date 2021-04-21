import Authorization from '../core/Authorization'
import BaseService from './BaseService'
import UserInfoDao from '../dao/UserInfoDao'
import { attrs } from '../utils/tools'
import bcrypt from 'bcryptjs'

export default class UserInfoService extends BaseService {
  /**
   * 注册
   * **/
  async register ({ nickname, username, password }) {
    // 检查是否存在
    const dao = new UserInfoDao()
    const user = await dao.getUserProfile({ username })
    if (user) {
      this.throwException(`user "${username}" already exist.`)
    }
    // 创建用户
    return this.transaction(async () => {
      const user = await dao.createUser({ nickname, username, password })
      return this._signUserToken(user.get())
    })
  }

  /**
   * 登录
   * **/
  async login ({ username, password }) {
    // 验证密码
    const user = await this._verifyUserPassword(username, password)
    // 获取信息
    return this._signUserToken(user.get())
  }

  /**
   * 更新密码
   * **/
  async updatePassword (tokenValue, { password, newPassword }) {
    // 验证密码
    const user = await this._verifyUserPassword(tokenValue.username, password)
    // 修改密码
    await this.transaction(async () => {
      await new UserInfoDao().updateUserProfile({ password: newPassword }, { id: user.id })
    })
    // 撤销用户所有令牌
    await new Authorization().revokeAll(tokenValue)
  }

  /**
   * 退出登录
   * **/
  async logout (tokenValue) {
    // 撤销用户当前令牌
    await new Authorization().revoke(tokenValue)
  }

  /**
   * 获取用户信息
   * **/
  async getUserInfo (id) {
    const dao = new UserInfoDao()
    const user = await dao.getUserProfile({ id })
    const info = await dao.getUserInfo({ userId: id })
    if (!user || !info) {
      this.throwException('user not found.', 404)
    }
    const userInfo = this.publicUserInfo(user.get())
    return Object.assign(userInfo, info.get(), { id: user.id })
  }

  // 可公开的用户信息
  // 只保留 id, username, nickname, role
  publicUserInfo (user) {
    return attrs(user, ['id', 'username', 'nickname', 'role'])
  }

  /**
   * private
   * **/
  // 签发token
  _signUserToken (user) {
    const userInfo = this.publicUserInfo(user)
    const token = new Authorization().sign(userInfo)
    return { userInfo, token }
  }

  // 检查用户密码
  async _verifyUserPassword (username, password) {
    const dao = new UserInfoDao()
    const user = await dao.getUserProfile({ username })
    if (!user) {
      this.throwException('user not found.', 404)
    }
    // 验证密码是否正确
    const correct = bcrypt.compareSync(password, user.password)
    if (!correct) {
      this.throwException('invalid username or password.')
    }
    return user
  }
}
