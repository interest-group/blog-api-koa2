import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'
import sequelize from '../core/sequelize'

export default class UserProfileModel extends Model {}

UserProfileModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '用户id'
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '状态',
    defaultValue: 1
  },
  nickname: {
    type: DataTypes.STRING(128),
    allowNull: false,
    comment: '用户昵称'
  },
  username: {
    type: DataTypes.STRING(128),
    unique: true,
    allowNull: false,
    comment: '用户账号'
  },
  password: {
    type: DataTypes.STRING(128),
    allowNull: false,
    set (value) {
      const password = bcrypt.hashSync(value, bcrypt.genSaltSync(10))
      this.setDataValue('password', password)
    },
    comment: '用户密码'
  },
  avatar: {
    type: DataTypes.STRING(256),
    comment: '用户头像'
  },
  gender: {
    type: DataTypes.SMALLINT,
    comment: '用户性别'
  },
  email: {
    type: DataTypes.STRING(128),
    comment: '用户邮箱'
  },
  role: {
    type: DataTypes.SMALLINT,
    comment: '用户角色'
  }
}, {
  sequelize,
  modelName: 'userProfile',
  comment: '用户摘要'
})
