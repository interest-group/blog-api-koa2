import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class ActionCollectionModel extends Model {}

ActionCollectionModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '收藏id'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  subjectType: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '收藏类型'
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '收藏数据id'
  }
}, {
  sequelize,
  modelName: 'actionCollection',
  comment: '收藏'
})
