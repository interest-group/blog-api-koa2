import KoaRouter from 'koa-router'
import Joi from 'joi'
import Exception from '../core/Exception'

// allowedMethods
export function allowedMethods () {
  return new KoaRouter().allowedMethods()
}

// 注册404
export function register404 () {
  const router = new KoaRouter()
  router.all('*', (ctx) => {
    throw new Exception({ status: 404, data: null, message: 'resource not found.' })
  })
  return router.routes()
}

// 注册路由
export function registerRoutes (config) {
  const { prefix, module, routes, auth } = validator(config)
  const router = new KoaRouter({ prefix })
  for (let i = 0; i < routes.length; i++) {
    addRoute(router, module, routes[i], auth)
  }
  return router.routes()
}

// 添加路由
function addRoute (router, module, route, auth) {
  const { method, path, action } = route
  const [controllerName, actionName] = action.split('.')
  // 控制器
  const Controller = require(`../controller/${module}/${controllerName}`).default
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
  module: Joi.string().required(),
  auth: Joi.boolean(),
  routes: Joi.array().items(
    Joi.object({
      method: Joi.string().required(),
      path: Joi.string().required(),
      action: Joi.string().required()
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
