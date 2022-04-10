// const passport = require('koa-passport')
const Router = require('koa-router')
const router = new Router()
const Tag = require('../../models/Tags')
const Article = require('../../models/Article')

/**
 * 测试
 */
router.get('/test', async (ctx) => {
  ctx.body = { msg: 'article is running' }
  ctx.status = 200
})

/**文章详情
 * @query id
 */
router.get('/:id', async (ctx) => {
  if (!ctx.params.id) {
    ctx.status = 200
    ctx.body = { msg: '文章不存在!' }
  } else {
    const id = ctx.params.id
    let article = await Article.findOne(
      { _id: id }
      //   , (err, data) => {
      //   if (err) {
      //     ctx.body = err
      //   } else if (!data) {
      //     ctx.body = { msg: '文章不存在' }
      //   } else {
      //     data.meta.views += 1
      //     await Article.updateOne({ _id: id }, { meta: data.meta }).then((res) => {
      //       ctx.body = res
      //     })
      //   }
      // }
    )
    if (article) {
      article.meta.views += 1
      await Article.updateOne({ _id: id }, { meta: article.meta }).then((res) => {
        ctx.body = res
      })
    } else {
      ctx.body = { msg: '文章不存在' }
    }
    ctx.body = article
  }
})

// 发布文章
router.post('/', async (ctx) => {
  // const { title, author, content, meta } = ctx.request.body
  console.log(ctx.request.body)
  const newArticle = new Article(ctx.request.body)
  await newArticle
    .save()
    .then((article) => {
      ctx.body = { article, msg: '请求成功' }
    })
    .catch((err) => {
      console.log(err)
    })
})

router.patch('/', async (ctx) => {
  const id = ctx.params.id
  const article = Article.findOne({ id })
  console.log(article)
})

module.exports = router.routes()
