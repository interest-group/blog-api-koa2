import BaseDao from './BaseDao'
import UserProfileModel from '../models/UserProfileModel'
import UserInfoModel from '../models/UserInfoModel'

export default class UserInfoDao extends BaseDao {
  // 查找用户摘要
  async getUserProfile (where) {
    return UserProfileModel.scope(null).findOne({ where })
  }

  // 查找用户信息
  async getUserInfo (where) {
    return UserInfoModel.findOne({ where })
  }

  // 创建用户
  async createUser (data) {
    const user = await UserProfileModel.create(data)
    await UserInfoModel.create({ userId: user.id })
    return user
  }

  // 更新用户 摘要
  async updateUserProfile (data, where) {
    return UserProfileModel.update(data, { where })
  }
}
