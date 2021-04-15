import Authorization from '../core/Authorization'
import BaseService from './BaseService'
import UserModel from '../models/UserModel'
import UserDao from '../dao/UserDao'

export default class UserService extends BaseService {
  async register ({ nickname, username, password }) {
    const user = await UserModel.findOne({
      where: { username }
    })
    if (user) {
      this.throwException(`user "${username}" already exist.`)
    }
    await UserModel.create({ nickname, username, password })
  }

  async login ({ username, password }) {
    const { id, nickname } = await UserDao.verify(username, password)
    const user = { id, username, nickname }
    user.token = new Authorization().sign(user)
    return user
  }
}
