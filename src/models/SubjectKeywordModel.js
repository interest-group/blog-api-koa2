import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SubjectKeywordModel extends Model {}

SubjectKeywordModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '关键词id'
  },
  sort: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '排序'
  },
  type: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '关键词类型'
  },
  value: {
    type: DataTypes.STRING(32),
    allowNull: false,
    comment: '关键词'
  }
}, {
  sequelize,
  modelName: 'subjectKeyword',
  comment: '关键词'
})
