import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class MessageNoticeModel extends Model {}

MessageNoticeModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '通知id'
  },
  type: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '通知类型'
  },
  status: {
    type: DataTypes.SMALLINT,
    comment: '通知状态'
  },
  fromUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '发起人'
  },
  toUserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '接收人'
  },
  content: {
    type: DataTypes.STRING(512),
    comment: '通知内容'
  },
  subjectType: {
    type: DataTypes.SMALLINT,
    comment: '数据类型'
  },
  subjectId: {
    type: DataTypes.INTEGER,
    comment: '数据id'
  },
  readTime: {
    type: DataTypes.DATE,
    comment: '阅读时间'
  },
  remark: {
    type: DataTypes.STRING(512),
    comment: '备注'
  }
}, {
  sequelize,
  modelName: 'messageNotice',
  comment: '消息通知'
})
