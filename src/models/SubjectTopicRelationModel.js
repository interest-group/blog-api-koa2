import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SubjectTopicRelationModel extends Model {}

SubjectTopicRelationModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '关联id'
  },
  topicId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '专题id'
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
  modelName: 'subjectTopicRelation',
  comment: '专题关联'
})
