import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class ActionFollowModel extends Model {}

ActionFollowModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '关注id'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '被关注id'
  }
}, {
  sequelize,
  modelName: 'actionFollow',
  comment: '关注'
})
