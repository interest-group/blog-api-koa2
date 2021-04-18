import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SubjectArticleModel extends Model {}

SubjectArticleModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '文章id'
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '状态',
    defaultValue: 1
  },
  plateId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '所属板块'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  title: {
    type: DataTypes.STRING(256),
    allowNull: false,
    comment: '文章标题'
  },
  cover: {
    type: DataTypes.STRING(256),
    comment: '文章封面'
  },
  summary: {
    type: DataTypes.STRING(256),
    comment: '文章摘要'
  },
  recommend: {
    type: DataTypes.BOOLEAN,
    comment: '推荐',
    defaultValue: false
  },
  likeCount: {
    type: DataTypes.INTEGER,
    comment: '点赞数量',
    defaultValue: 0
  },
  commentCount: {
    type: DataTypes.INTEGER,
    comment: '评论数量',
    defaultValue: 0
  },
  readCount: {
    type: DataTypes.INTEGER,
    comment: '阅读数量',
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'subjectArticle',
  comment: '文章'
})
