import { DataTypes } from 'sequelize'
import dayjs from 'dayjs'
import sequelize from '../core/sequelize'

export default sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '用户昵称'
  },
  username: {
    type: DataTypes.STRING(64),
    unique: true,
    allowNull: false,
    comment: '用户账号'
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '用户密码'
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    get () {
      return dayjs(this.getDataValue('created_at')).format('YYYY-MM-DD')
    }
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    get () {
      return dayjs(this.getDataValue('created_at')).format('YYYY-MM-DD')
    }
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    get () {
      return dayjs(this.getDataValue('created_at')).format('YYYY-MM-DD')
    }
  }
})
