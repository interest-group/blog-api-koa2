import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class UserInfoModel extends Model {}

UserInfoModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '数据id'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  userSignature: {
    type: DataTypes.STRING(512),
    comment: '个人签名'
  },
  articleCount: {
    type: DataTypes.INTEGER,
    comment: '文章数量',
    defaultValue: 0
  },
  commentCount: {
    type: DataTypes.INTEGER,
    comment: '评论数量',
    defaultValue: 0
  },
  likeCount: {
    type: DataTypes.INTEGER,
    comment: '获得点赞数量',
    defaultValue: 0
  },
  followCount: {
    type: DataTypes.INTEGER,
    comment: '关注用户数量',
    defaultValue: 0
  },
  fansCount: {
    type: DataTypes.INTEGER,
    comment: '粉丝数量',
    defaultValue: 0
  },
  points: {
    type: DataTypes.INTEGER,
    comment: '积分',
    defaultValue: 0
  },
  remark: {
    type: DataTypes.STRING(512),
    comment: '备注'
  }
}, {
  sequelize,
  modelName: 'userInfo',
  comment: '用户信息'
})
