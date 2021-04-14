import Koa2 from 'koa'
import koaOnerror from 'koa-onerror'
import koaStatic from 'koa-static2'
import koaLogger from 'koa-logger'
import koaJwt from 'koa-jwt'
import koaBody from 'koa-body'
import path from 'path'
import errorHandler from './middleware/errorHandler'
import apoRoutes from './routes/api'
import adminRoutes from './routes/admin'

const app = new Koa2()

const env = process.env.NODE_ENV || 'development'

const jwtKey = 'shared-secret'

// error handler
koaOnerror(app)

app
  .use(errorHandler())
  .use(koaLogger())
  .use(koaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(koaJwt({ secret: jwtKey }).unless({ path: [/^\/api|^\/assets/] }))
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
  .use(apoRoutes.routes(), apoRoutes.allowedMethods())
  .use(adminRoutes.routes(), apoRoutes.allowedMethods())

if (env === 'development') { // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
}

app.listen('5200')

console.log('Now start API server on port 5200 ...')

export default app
