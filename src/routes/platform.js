import KoaRouter from 'koa-router'
import platform from '../controller/platform'

const router = new KoaRouter({ prefix: '/platform' })

router.post('/register', platform.user.register)

module.exports = router
