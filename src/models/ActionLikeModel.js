import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class ActionLikeModel extends Model {}

ActionLikeModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '点赞id'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  subjectType: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '点赞类型'
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '点赞数据id'
  }
}, {
  sequelize,
  modelName: 'actionLike',
  comment: '点赞'
})
