import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SystemAuthorityModel extends Model {}

SystemAuthorityModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '权限id'
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '权限名称'
  },
  describe: {
    type: DataTypes.STRING(512),
    comment: '权限描述'
  }
}, {
  sequelize,
  modelName: 'systemAuthority',
  comment: '系统权限'
})
