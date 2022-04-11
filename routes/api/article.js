// const passport = require('koa-passport')
const Router = require('koa-router')
const router = new Router()
const fs = require('fs')
const mime = require('mime-types')
const path = require('path')
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
router.get('/detail/:id', async (ctx) => {
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
  // console.log(ctx.request.body)
  let length = ctx.request.body.content.length
  const newArticle = new Article(ctx.request.body, length)
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

// 上传图片
router.post('/head-img', (ctx) => {
  const file = ctx.request.files.file
  const baseName = path.basename(file.path)
  ctx.body = { url: `${ctx.origin}/uploads/${baseName}` }
})

const { dir } = require('../../public/uploads/dir')
router.get('/head-img', (ctx) => {
  console.log(ctx.query.path)
  let filePath = path.join(dir, ctx.query.path)
  let file = null
  try {
    file = fs.readFileSync(filePath)
  } catch (err) {
    filePath = path.join(dir, 'default.jpg')
    file = fs.readFileSync(filePath)
  }

  let mimeType = mime.lookup(filePath)
  ctx.set('content-type', mimeType)
  ctx.body = file
})

module.exports = router.routes()
