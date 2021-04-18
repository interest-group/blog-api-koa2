import bcrypt from 'bcryptjs'
import Dao from './Dao'
import UserProfileModel from '../models/UserProfileModel'

export default class UserDao extends Dao {
  // 检查用户密码
  static async verifyPassword (username, password) {
    const user = await UserProfileModel.scope(null).findOne({
      where: { username }
    })
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

  // 创建用户
  static async createUser ({ nickname, username, password }) {
    const user = await UserProfileModel.findOne({ where: { username } })
    if (user) {
      Dao.throwException(`user "${username}" already exist.`)
    }
    return UserProfileModel.create({ nickname, username, password })
  }
}
