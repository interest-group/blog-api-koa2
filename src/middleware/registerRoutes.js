import Joi from 'joi'
import KoaRouter from 'koa-router'

export default function (config) {
  const { prefix, controllers, routes } = validator(config)
  const router = new KoaRouter({ prefix })
  for (let i = 0; i < routes.length; i++) {
    addRoute(router, controllers, routes[i])
  }
  return router
}

// 添加路由
function addRoute (router, controllers, [method, path, actions]) {
  const [name, action] = actions.split('.')
  const Controller = controllers[name]
  router[method](path, (ctx) => {
    const controller = new Controller(ctx)
    return controller[action](ctx)
  })
}

// 参数校验 schema
const schema = Joi.object({
  prefix: Joi.string().required(),
  controllers: Joi.object().required(),
  routes: Joi.array().items(
    Joi.array().items(
      Joi.valid('post', 'get', 'all').required(),
      Joi.string().required(),
      Joi.string().required()
    )
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
