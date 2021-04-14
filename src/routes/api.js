import KoaRouter from 'koa-router'

const router = new KoaRouter({ prefix: '/api' })

router.post('/test', async (ctx, next) => {
  ctx.body = {
    result: '/test',
    name: ctx.params.name,
    para: ctx.request.body
  }
})

module.exports = router
