import Koa2 from 'koa'
import koaStatic from 'koa-static2'
import koaLogger from 'koa-logger'
import koaJwt from 'koa-jwt'
import koaBody from 'koa-body'
import path from 'path'
import httpException from './middleware/httpException'
import identity from './middleware/identity'
import { getOptions } from './core/Authorization'
import serverCfg from './config/server'
import apiRouter, { skipJwtApis } from './routes/api'
import { isDevelop } from './utils/env'

import './models/index'

const app = new Koa2()

// Console
app.use(koaLogger())
// Static resource
app.use(koaStatic('resources', path.resolve(__dirname, '../resources')))
// Global Exception
app.use(httpException())
// Jwt Verify
app.use(koaJwt(getOptions()).unless({ path: [/^\/resources/].concat(skipJwtApis) }))
// User Identity
app.use(identity())
// Body Format
app.use(koaBody({
  multipart: true,
  formidable: {
    // 设置上传文件大小最大限制，默认2M
    maxFileSize: 200 * 1024 * 1024
  },
  jsonLimit: '10mb',
  formLimit: '10mb'
}))
// Routes
app.use(apiRouter.routes())
app.use(apiRouter.allowedMethods())

if (isDevelop()) {
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
