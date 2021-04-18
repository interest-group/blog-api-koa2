import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class BaseTopicModel extends Model {}

BaseTopicModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '专题id'
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
    comment: '专题类型'
  },
  title: {
    type: DataTypes.STRING(128),
    allowNull: false,
    comment: '专题标题'
  },
  describe: {
    type: DataTypes.STRING(512),
    comment: '专题描述'
  }
}, {
  sequelize,
  modelName: 'baseTopic',
  comment: '专题'
})
