import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class RecordActionModel extends Model {}

RecordActionModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '日志id'
  },
  actionType: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '操作类型'
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
  describe: {
    type: DataTypes.STRING(512),
    allowNull: false,
    comment: '操作描述'
  },
  remark: {
    type: DataTypes.STRING(512),
    comment: '操作备注'
  }
}, {
  sequelize,
  modelName: 'recordAction',
  comment: '操作日志'
})
