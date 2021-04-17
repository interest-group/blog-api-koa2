import registerRoutes from '../middleware/registerRoutes'
import controllers from '../controller/api'

export default registerRoutes({
  prefix: '/api/v1',
  controllers,
  routes: [
    ['post', '/register', 'UserController.register'],
    ['post', '/login', 'UserController.login'],
    ['get', '/user/info', 'UserController.info'],
    ['get', '/user/logout', 'UserController.logout'],
    ['post', '/user/update/password', 'UserController.updatePassword']
  ]
})
