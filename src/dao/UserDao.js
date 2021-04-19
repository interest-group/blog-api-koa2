import bcrypt from 'bcryptjs'
import Dao from './Dao'
import UserProfileModel from '../models/UserProfileModel'
import UserInfoModel from '../models/UserInfoModel'
import { attrs } from '../utils/tools'

export default class UserDao extends Dao {
  /**
   * 检查用户密码
   * **/
  static async verifyPassword (username, password) {
    const user = await UserProfileModel.scope(null).findOne({ where: { username } })
    if (!user) {
      Dao.throwException('invalid username or password.')
    }
    // 验证密码是否正确
    const correct = bcrypt.compareSync(password, user.password)
    if (!correct) {
      Dao.throwException('invalid username or password.')
    }
    return user
  }

  /**
   * 创建用户
   * **/
  static async createUser ({ nickname, username, password }) {
    let user = await UserProfileModel.findOne({ where: { username } })
    if (user) {
      Dao.throwException(`user "${username}" already exist.`)
    }
    user = await UserProfileModel.create({ nickname, username, password })
    await UserInfoModel.create({ userId: user.id })
    return user
  }

  /**
   * 获取用户信息
   * **/
  static async getUserInfo (id) {
    const user = await UserProfileModel.findOne({ where: { id } })
    const info = await UserInfoModel.findOne({ where: { userId: id } })
    if (!user || !info) {
      Dao.throwException('user not found.', 404)
    }
    return Object.assign(user.get(), info.get(), { id: user.id })
  }
}
