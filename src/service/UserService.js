import BaseService from './BaseService'
import UserModel from '../models/UserModel'
import Exception from '../core/Exception'
import UserDao from '../dao/UserDao'

export default class UserService extends BaseService {
  async register ({ nickname, username, password }) {
    let user = await UserModel.findOne({ where: { username } })
    if (user) {
      throw new Exception({ message: `user "${username}" already exist.` })
    }
    user = new UserModel()
    user.nickname = nickname
    user.username = username
    user.password = password
    await user.save()
  }

  async login ({ username, password }) {
    const user = await UserDao.verify(username, password)
    return user
  }
}
