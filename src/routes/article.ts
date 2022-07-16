import Router from 'koa-router'
import { auth } from '../utils'
import { articleController, staticController } from '../controller'

const router = new Router({ prefix: '/article' })

// 文章详情
router.get('/:id', articleController.getArticleDetailById)

// 发布文章
router.post('/', auth, articleController.publishArticle)

// 作者Id文章列表
router.get('/user/:userId', articleController.getAuthorArticleList)

router.post('/head-img', staticController.publishImg)

router.get('/liked/:id', auth, articleController.ifLiked)

router.post('/like', auth, articleController.likeArticle)

router.post('/cancelLike', auth, articleController.cancelLikeArticle)

export default router.routes()
