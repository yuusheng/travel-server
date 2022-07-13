import Router from 'koa-router'
import { UserController } from '../controller'

const router = new Router({ prefix: '/user' })

router.get('/', async (ctx) => {
  ctx.body = { msg: 'user is working' }
})

router.get('/login', UserController.login)

export default router.routes()
