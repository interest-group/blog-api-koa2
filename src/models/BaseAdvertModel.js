import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class BaseAdvertModel extends Model {}

BaseAdvertModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '广告位id'
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '状态',
    defaultValue: 1
  },
  type: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '广告类型'
  },
  title: {
    type: DataTypes.STRING(128),
    allowNull: false,
    comment: '广告标题'
  },
  describe: {
    type: DataTypes.STRING(512),
    comment: '广告描述'
  }
}, {
  sequelize,
  modelName: 'baseAdvert',
  comment: '广告位'
})
