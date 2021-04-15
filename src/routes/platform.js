import registerRoutes from '../middleware/registerRoutes'
import platform from '../controller/platform'

const router = registerRoutes({
  prefix: '/platform',
  controllers: platform,
  routes: [
    ['post', '/register', 'UserController.register'],
    ['post', '/login', 'UserController.login'],
    ['post', '/user/info', 'UserController.info']
  ]
})

export default router
