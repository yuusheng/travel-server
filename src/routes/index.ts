import Router from 'koa-router'
const router = new Router({ prefix: '/api' })

import user from './user'

router.get('/', async (ctx) => {
  ctx.body = { msg: 'hello koa-ts' }
})

router.use(user)

export default router
