export default {
  prefix: '/api/private/v1',
  module: 'private',
  auth: true,
  routes: [
    // 用户中心
    {
      method: 'get',
      path: '/user/info',
      action: 'UserInfoController.getTokenInfo'
    },
    {
      method: 'get',
      path: '/user/logout',
      action: 'UserInfoController.logout'
    },
    {
      method: 'post',
      path: '/user/password',
      action: 'UserInfoController.updatePassword'
    },
    // 系统 配置项
    {
      method: 'get',
      path: '/system/configuration',
      action: 'SystemConfigurationController.getConfiguration'
    },
    {
      method: 'post',
      path: '/system/configuration',
      action: 'SystemConfigurationController.createConfiguration'
    },
    {
      method: 'post',
      path: '/system/configuration/:id',
      action: 'SystemConfigurationController.updateConfiguration'
    },
    {
      method: 'get',
      path: '/system/configuration/:id',
      action: 'SystemConfigurationController.getConfigurationParam'
    }
  ]
}
