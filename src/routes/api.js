import registerRoutes from '../middleware/registerRoutes'
import api from '../controller/api'

const router = registerRoutes({
  prefix: '/api/v1',
  controllers: api,
  routes: [
    ['post', '/register', 'UserController.register'],
    ['post', '/login', 'UserController.login'],
    ['get', '/user/info', 'UserController.info'],
    ['get', '/user/logout', 'UserController.logout'],
    ['post', '/user/update/password', 'UserController.updatePassword']
  ]
})

export default router
