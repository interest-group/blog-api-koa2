import Koa2 from 'koa'
import koaOnerror from 'koa-onerror'
import koaStatic from 'koa-static2'
import koaLogger from 'koa-logger'
import koaJwt from 'koa-jwt'
import koaBody from 'koa-body'
import path from 'path'
import httpException from './middleware/httpException'
import identity from './middleware/identity'
import authorizationCfg from './config/authorization'
import serverCfg from './config/server'
import apiRoutes from './routes/api'

const app = new Koa2()

const env = process.env.NODE_ENV || 'development'

// error handler
koaOnerror(app)

app
  .use(koaLogger())
  .use(httpException())
  .use(identity())
  .use(koaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(koaJwt({ secret: authorizationCfg.secretKey }).unless({
    path: [/^\/api\/v1\/login|^\/api\/v1\/register/]
  }))
  .use(koaBody({
    multipart: true,
    // parse GET, HEAD, DELETE requests
    parsedMethods: ['POST', 'PUT', 'PATCH', 'GET', 'HEAD', 'DELETE'],
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  }))
  .use(apiRoutes.routes(), apiRoutes.allowedMethods())

if (env === 'development') {
  // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
}

app.listen(serverCfg.port)

console.log(`Now start API server on port ${serverCfg.port} ...`)

export default app
