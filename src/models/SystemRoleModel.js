import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SystemRoleModel extends Model {}

SystemRoleModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '角色id'
  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '角色名称'
  },
  describe: {
    type: DataTypes.STRING(512),
    comment: '角色描述'
  }
}, {
  sequelize,
  modelName: 'systemRole',
  comment: '系统角色'
})
