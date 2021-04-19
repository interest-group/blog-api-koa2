export default {
  prefix: '/api/private/v1',
  module: 'private',
  auth: true,
  routes: [
    // 用户中心
    {
      method: 'get',
      path: '/user/info',
      action: 'UserController.getTokenInfo'
    },
    {
      method: 'get',
      path: '/user/logout',
      action: 'UserController.logout'
    },
    {
      method: 'post',
      path: '/user/password',
      action: 'UserController.updatePassword'
    },
    // 系统
    {
      method: 'get',
      path: '/system/configuration',
      action: 'SystemController.getConfigurationList'
    },
    {
      method: 'get',
      path: '/system/configuration/:id',
      action: 'SystemController.getConfiguration'
    }
  ]
}
