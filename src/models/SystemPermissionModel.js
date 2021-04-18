import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SystemPermissionModel extends Model {}

SystemPermissionModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '权限分配id'
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '角色id'
  },
  authorityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '权限id'
  }
}, {
  sequelize,
  modelName: 'systemPermission',
  comment: '系统权限分配'
})
