import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SystemConfigurationModel extends Model {}

SystemConfigurationModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '配置项id'
  },
  type: {
    type: DataTypes.SMALLINT,
    comment: '配置项类型',
    defaultValue: 1
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    comment: '配置项名称'
  },
  value: {
    type: DataTypes.STRING(128),
    allowNull: false,
    comment: '配置项值'
  },
  describe: {
    type: DataTypes.STRING(512),
    comment: '配置项描述'
  }
}, {
  sequelize,
  modelName: 'systemConfiguration',
  comment: '系统配置项'
})
