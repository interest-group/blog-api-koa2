import Exception from '../core/Exception'
import UserModel from '../models/User'

export default class User {
  static async create (params) {
    const { nickname, username, password } = params
    let user = await UserModel.findOne({
      where: { username }
    })
    if (user) {
      throw new Exception(`user "${username}" already exist.`)
    }
    user = new UserModel()
    user.nickname = nickname
    user.username = username
    user.password = password
    await user.save()
    return [null]
  }
}
