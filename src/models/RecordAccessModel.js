import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class RecordAccessModel extends Model {}

RecordAccessModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '日志id'
  },
  actionType: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '访问类型'
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
    comment: '访问描述'
  },
  remark: {
    type: DataTypes.STRING(512),
    comment: '访问备注'
  }
}, {
  sequelize,
  modelName: 'recordAccess',
  comment: '访问日志'
})
