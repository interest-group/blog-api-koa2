import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SystemConfigurationParamModel extends Model {}

SystemConfigurationParamModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '参数id'
  },
  configurationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '配置项id'
  },
  name: {
    type: DataTypes.STRING(128),
    allowNull: false,
    comment: '参数名'
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '参数值'
  },
  describe: {
    type: DataTypes.STRING(512),
    comment: '参数描述'
  }
}, {
  sequelize,
  modelName: 'systemConfigurationParam',
  comment: '系统配置参数'
})
