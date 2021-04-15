import { Model, DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'
import sequelize from '../core/sequelize'

export default class UserModel extends Model {}

UserModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '用户昵称'
  },
  username: {
    type: DataTypes.STRING(64),
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
  email: {
    type: DataTypes.STRING(128),
    comment: '用户邮箱'
  }
}, {
  sequelize,
  modelName: 'user'
})
