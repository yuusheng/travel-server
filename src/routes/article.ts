import Router from 'koa-router'
import { articleController } from '../controller'

const router = new Router({ prefix: '/article' })

router.get('/:id', articleController.getArticleDetailById)

router.post('/', articleController.publishArticle)

router.get('/user/:userId', articleController.getAuthorArticleList)

export default router.routes()
