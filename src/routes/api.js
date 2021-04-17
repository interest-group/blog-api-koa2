import registerRoutes from '../middleware/registerRoutes'
import controllers from '../controller/api'

export default registerRoutes({
  prefix: '/api/v1',
  controllers,
  routes: [
    ['get', '/test', 'UserController.test']
  ]
})
