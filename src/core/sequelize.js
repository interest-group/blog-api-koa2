import Sequelize from 'sequelize'
import cls from 'cls-hooked'
import config from '../config/database'

const { host, port } = config

const namespace = cls.createNamespace('sequelize-namespace')
Sequelize.useCLS(namespace)

const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: 'mysql',
  host,
  port,
  logging: false,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime',
    deletedAt: 'deleteTime',
    defaultScope: {
      attributes: {
        exclude: ['password', 'updateTime', 'deleteTime']
      }
    }
  }
})
sequelize.authenticate().then(() => {
  console.log('connection has been established successfully.')
  sequelize.sync()
}).catch(error => {
  console.error('unable to connect to the database:', error)
})

export default sequelize
