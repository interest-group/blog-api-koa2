import controllers from '../controller/api'

export default {
  prefix: '/api/v1',
  controllers,
  routes: [
    // 测试
    {
      method: 'all',
      path: '/test',
      action: 'TestController.test',
      auth: false
    },
    // 用户中心
    {
      method: 'post',
      path: '/user/register',
      action: 'UserController.register',
      auth: false
    },
    {
      method: 'post',
      path: '/user/login',
      action: 'UserController.login',
      auth: false
    },
    {
      method: 'get',
      path: '/user/info',
      action: 'UserController.getTokenInfo',
      auth: true
    },
    {
      method: 'get',
      path: '/user/info/:id',
      action: 'UserController.getUserInfo',
      auth: true
    },
    {
      method: 'get',
      path: '/user/info',
      action: 'UserController.info',
      auth: true
    },
    {
      method: 'get',
      path: '/user/logout',
      action: 'UserController.logout',
      auth: true
    },
    {
      method: 'post',
      path: '/user/update/password',
      action: 'UserController.updatePassword',
      auth: true
    },
    // 文件服务
    {
      method: 'post',
      path: '/file/upload/server',
      action: 'FileController.uploadServer',
      auth: false
    },
    {
      method: 'post',
      path: '/file/upload/oss',
      action: 'FileController.uploadOSS',
      auth: false
    },
    {
      method: 'get',
      path: '/file/upload/token',
      action: 'FileController.uploadToken',
      auth: false
    }
  ]
}
