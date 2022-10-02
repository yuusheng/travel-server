import Router from 'koa-router'

import user from './user'
import article from './article'
import profile from './profile'
const router = new Router({ prefix: '/api' })

router.get('/', async (ctx) => {
  ctx.body = { msg: 'hello koa-ts' }
})

router.use(user)
router.use(article)
router.use(profile)

export default router
