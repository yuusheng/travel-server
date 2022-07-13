import Router from 'koa-router'
import { articleController } from './../controller'

const router = new Router({ prefix: '/article' })

router.get('/detail/:id', articleController.getArticleDetailById)

export default router.routes()
