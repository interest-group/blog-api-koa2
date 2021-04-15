import KoaRouter from 'koa-router'

const router = new KoaRouter({ prefix: '/api' })

router.get('/test/:id', async (ctx, next) => {
  ctx.body = {
    result: '/test',
    name: ctx.params.id,
    para: ctx.request.body
  }
})

export default router
