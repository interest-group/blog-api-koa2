import Authorization from '../core/Authorization'
import BaseService from './BaseService'
import UserDao from '../dao/UserDao'
import UserModel from '../models/UserModel'

export default class UserService extends BaseService {
  // 注册
  async register ({ nickname, username, password }) {
    return this.transaction(async () => {
      const data = await UserDao.createUser({ nickname, username, password })
      return this.signToken(data.get())
    })
  }

  // 登录
  async login ({ username, password }) {
    const user = await UserDao.verifyPassword(username, password)
    return this.signToken(user)
  }

  // 更新密码
  async updatePassword ({ username, password, newPassword }) {
    const { id } = await UserDao.verifyPassword(username, password)
    return this.transaction(async () => {
      await UserModel.update({ password: newPassword }, { where: { id } })
    })
  }

  // 签发token
  signToken ({ id, username, nickname, role }) {
    const user = { id, username, nickname, role }
    const token = new Authorization().sign(user)
    return { user, token }
  }
}
