import config from 'config'
import Sequelize from 'sequelize'
import cls from 'cls-hooked'

const { database, username, password, dialect, host, port } = config.get('dbConfig')

const namespace = cls.createNamespace('sequelize-namespace')
Sequelize.useCLS(namespace)

const sequelize = new Sequelize(database, username, password, {
  dialect,
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
    // createUserId: {
    //   type: DataTypes.INTEGER,
    //   comment: '创建人id'
    // }
  }
})
sequelize.authenticate().then(() => {
  console.log('mysql connection successfully.')
  sequelize.sync()
}).catch(error => {
  console.log('mysql connection fail:', error)
})

export default sequelize
