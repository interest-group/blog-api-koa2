import Koa2 from 'koa'
import koaOnerror from 'koa-onerror'
import koaStatic from 'koa-static2'
import koaLogger from 'koa-logger'
import koaJwt from 'koa-jwt'
import koaBody from 'koa-body'
import path from 'path'
import config from './config'
import success from './middleware/success'
import onException from './middleware/onException'
import apiRoutes from './routes/api'
import platformRoutes from './routes/platform'

const app = new Koa2()

const env = process.env.NODE_ENV || 'development'

// error handler
koaOnerror(app)

app
  .use(success())
  .use(onException())
  .use(koaLogger())
  .use(koaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(koaJwt({ secret: config.security.secretKey }).unless({ path: [/^\/api|^\/assets|^\/platform\/register/] }))
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
  // Processing request
  .use(apiRoutes.routes(), apiRoutes.allowedMethods())
  .use(platformRoutes.routes(), platformRoutes.allowedMethods())

if (env === 'development') {
  // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
}

app.listen(config.server.port)

console.log(`Now start API server on port ${config.server.port} ...`)

export default app
