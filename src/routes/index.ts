import Router from 'koa-router'
const router = new Router({ prefix: '/api' })

import user from './user'
import article from './article'
import profile from './profile'

router.get('/', async (ctx) => {
  ctx.body = { msg: 'hello koa-ts' }
})

router.use(user)
router.use(article)
router.use(profile)

export default router
