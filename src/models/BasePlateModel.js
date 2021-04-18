import { Model, DataTypes } from 'sequelize'
import sequelize from '../core/sequelize'

export default class BasePlateModel extends Model {}

BasePlateModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '板块id'
  },
  status: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '状态',
    defaultValue: 1
  },
  type: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    comment: '板块类型'
  },
  title: {
    type: DataTypes.STRING(128),
    allowNull: false,
    comment: '板块标题'
  },
  describe: {
    type: DataTypes.STRING(512),
    comment: '板块描述'
  }
}, {
  sequelize,
  modelName: 'basePlate',
  comment: '板块'
})
