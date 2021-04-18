import registerRoutes from '../middleware/registerRoutes'
import controllers from '../controller/api'

const config = {
  prefix: '/api/v1',
  controllers,
  routes: [
    // 测试
    ['all', '/test', 'TestController.test', true],

    // 用户中心
    ['post', '/user/register', 'UserController.register', true],
    ['post', '/user/login', 'UserController.login', true],
    ['get', '/user/info', 'UserController.info'],
    ['get', '/user/logout', 'UserController.logout'],
    ['post', '/user/update/password', 'UserController.updatePassword'],

    // 文件服务
    ['post', '/file/upload/server', 'FileController.uploadServer'],
    ['post', '/file/upload/oss', 'FileController.uploadOSS'],
    ['get', '/file/upload/token', 'FileController.uploadToken']
  ]
}

export default registerRoutes(config)

export const skipJwtApis = config.routes
  .filter(route => route[3])
  .map(route => new RegExp(`^${config.prefix}${route[1]}`))
