import Router from 'koa-router'
import { userController } from '../controller'

const router = new Router({ prefix: '/user' })

router.get('/', async (ctx) => {
  ctx.body = { msg: 'user is working' }
})

router.get('/login', userController.login)

export default router.routes()
