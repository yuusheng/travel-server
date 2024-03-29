import Router from 'koa-router'
import { auth } from '../utils'
import { userController } from '../controller'

const router = new Router({ prefix: '/users' })

router.get('/', async (ctx) => {
  ctx.body = { msg: 'user is working' }
})

router.post('/login', userController.login)

router.get('/current', auth, userController.current)

export default router.routes()
