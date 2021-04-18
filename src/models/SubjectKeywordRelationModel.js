import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SubjectKeywordRelationModel extends Model {}

SubjectKeywordRelationModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '关联id'
  },
  keywordId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '关键词id'
  },
  subjectType: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '关联类型'
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '数据id'
  }
}, {
  sequelize,
  modelName: 'subjectKeywordRelation',
  comment: '关键词关联'
})
