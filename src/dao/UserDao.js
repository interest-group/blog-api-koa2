import bcrypt from 'bcryptjs'
import UserModel from '../models/UserModel'
import Exception from '../core/Exception'

export default class UserDao {
  static async verify (username, password) {
    // 查询用户是否存在
    const user = await UserModel.findOne({ where: { username } })
    if (!user) {
      throw new Exception({ message: '用户名或密码错误.' })
    }
    // 验证密码是否正确
    const correct = bcrypt.compareSync(password, user.password)
    if (!correct) {
      throw new Exception({ message: '用户名或密码错误.' })
    }
    return user
  }
}
