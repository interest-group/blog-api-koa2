import { Model, DataTypes } from 'sequelize'
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
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '用户密码'
  }
}, {
  sequelize,
  modelName: 'user'
})
