import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class SubjectAdModel extends Model {}

SubjectAdModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '广告id'
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '状态',
    defaultValue: 1
  },
  sort: {
    type: DataTypes.INTEGER,
    comment: '排序',
    defaultValue: 0
  },
  advertId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '广告位id'
  },
  title: {
    type: DataTypes.STRING(128),
    allowNull: false,
    comment: '广告标题'
  },
  cover: {
    type: DataTypes.STRING(256),
    comment: '广告封面'
  },
  link: {
    type: DataTypes.STRING(256),
    comment: '广告链接'
  },
  content: {
    type: DataTypes.STRING(512),
    comment: '广告内容'
  },
  remark: {
    type: DataTypes.STRING(512),
    comment: '备注'
  }
}, {
  sequelize,
  modelName: 'subjectAd',
  comment: '广告'
})
