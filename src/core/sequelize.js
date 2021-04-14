import Sequelize from 'sequelize'
import config from '../config'

const { host, port, database, username, password } = config.database

const sequelize = new Sequelize(database, username, password, {
  dialect: 'mysql',
  host,
  port,
  logging: false,
  timezone: '+08:00',
  define: {
    // create_time && update_time
    timestamps: true,
    // delete_time
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    // 把驼峰命名转换为下划线
    underscored: true
  }
})
sequelize.authenticate().then(() => {
  sequelize.sync({ force: false })
}).catch(error => {
  console.error('Unable to connect to the database:', error)
})

export default sequelize
