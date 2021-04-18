import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SubjectContentModel extends Model {}

SubjectContentModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '内容id'
  },
  subjectType: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '数据类型'
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '数据id'
  },
  content: {
    type: DataTypes.TEXT,
    comment: '数据内容'
  }
}, {
  sequelize,
  modelName: 'subjectContent',
  comment: '内容'
})
