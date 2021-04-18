import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SubjectCommentModel extends Model {}

SubjectCommentModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '评论id'
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '状态',
    defaultValue: 1
  },
  subjectType: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '评论类型'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  subjectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '评论数据id'
  },
  replyId: {
    type: DataTypes.INTEGER,
    comment: '回复id',
    defaultValue: 0
  },
  likeCount: {
    type: DataTypes.INTEGER,
    comment: '点赞数量',
    defaultValue: 0
  },
  content: {
    type: DataTypes.STRING(512),
    comment: '评论内容'
  }
}, {
  sequelize,
  modelName: 'subjectComment',
  comment: '评论'
})
