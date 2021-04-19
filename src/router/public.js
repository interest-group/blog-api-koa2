export default {
  prefix: '/api/public/v1',
  module: 'public',
  auth: false,
  routes: [
    /**
     * 测试
     * **/
    {
      method: 'all',
      path: '/test',
      action: 'TestController.test'
    },
    /**
     * 用户
     * **/
    {
      method: 'post',
      path: '/user/register',
      action: 'UserController.register'
    },
    {
      method: 'post',
      path: '/user/login',
      action: 'UserController.login'
    },
    {
      method: 'get',
      path: '/user/info/:id',
      action: 'UserController.getUserInfo'
    },
    /**
     * 文件服务
     * **/
    {
      method: 'post',
      path: '/file/upload/server',
      action: 'FileController.uploadServer'
    },
    {
      method: 'post',
      path: '/file/upload/oss',
      action: 'FileController.uploadOSS'
    },
    {
      method: 'get',
      path: '/file/upload/token',
      action: 'FileController.uploadToken'
    }
  ]
}
