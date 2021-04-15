import registerRoutes from '../middleware/registerRoutes'
import api from '../controller/api'

const router = registerRoutes({
  prefix: '/api/v1',
  controllers: api,
  routes: [
    ['post', '/register', 'UserController.register'],
    ['post', '/login', 'UserController.login'],
    ['post', '/user/info', 'UserController.info']
  ]
})

export default router
