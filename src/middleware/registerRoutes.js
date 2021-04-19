import KoaRouter from 'koa-router'
import Joi from 'joi'
import Exception from '../core/Exception'

// 注册路由
export function registerRoutes (routerConfig) {
  const { prefix, controllers, routes } = validator(routerConfig)
  const router = new KoaRouter({ prefix })
  for (let i = 0; i < routes.length; i++) {
    addRoute(router, controllers, routes[i])
  }
  return router.routes()
}

// 注册404
export function register404 () {
  const router = new KoaRouter()
  router.all('*', (ctx) => {
    throw new Exception({ status: 404, data: null, message: 'resource not found.' })
  })
  return router.routes()
}

// allowedMethods
export function allowedMethods () {
  return new KoaRouter().allowedMethods()
}

// 添加路由
function addRoute (router, controllers, route) {
  const { method, path, action, auth } = route
  const [className, actionName] = action.split('.')
  // 控制器
  const Controller = controllers[className]
  router[method](path, (ctx) => {
    // jwt 校验
    if (auth && ctx.state.jwtOriginalError) {
      throw new Exception({ status: 401, data: null, message: 'protected resource, use Authorization header to get access.' })
    }
    const controller = new Controller(ctx)
    return controller[actionName](ctx)
  })
}

// 参数校验 schema
const schema = Joi.object({
  prefix: Joi.string().required(),
  controllers: Joi.object().required(),
  routes: Joi.array().items(
    Joi.object({
      method: Joi.string().required(),
      path: Joi.string().required(),
      action: Joi.string().required(),
      auth: Joi.boolean()
    }).required()
  ).required()
})

// 参数校验
function validator (config) {
  const { value, error } = schema.validate(config)
  if (error) {
    throw error
  }
  return value
}
