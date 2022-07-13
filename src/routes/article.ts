import Router from 'koa-router'
import { articleController, staticController } from '../controller'

const router = new Router({ prefix: '/article' })

// 文章详情
router.get('/:id', articleController.getArticleDetailById)

// 发布文章
router.post('/', articleController.publishArticle)

// 作者Id文章列表
router.get('/user/:userId', articleController.getAuthorArticleList)

router.post('/head-img', staticController.publishImg)

export default router.routes()
