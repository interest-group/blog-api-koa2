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
    timestamps: true,
    paranoid: true,
    underscored: true
  }
})
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
  sequelize.sync()
}).catch(error => {
  console.error('Unable to connect to the database:', error)
})

export default sequelize
