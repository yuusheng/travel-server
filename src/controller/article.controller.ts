import { Article } from '../models'
import { KoaCtx } from '../types'

class ArticleController {
  async getArticleDetailById(ctx: KoaCtx) {
    if (!ctx.params.id) {
      ctx.status = 200
      ctx.body = { msg: '文章不存在!' }
    } else {
      const id = ctx.params.id
      let article = await Article.findOne({ _id: id })
      if (article) {
        const meta = {
          ...article.meta,
          views: (article.meta?.views as unknown as number) + 1,
        }
        await Article.updateOne({ _id: id }, { meta }).then((res) => {
          ctx.body = res
        })
      } else {
        ctx.body = { msg: '文章不存在' }
      }
      ctx.body = article
    }
  }

  async publishArticle(ctx: KoaCtx) {
    let length = ctx.request.body.content.length
    const newArticle = new Article(ctx.request.body, length)
    await newArticle
      .save()
      .then((article) => {
        ctx.body = { ...article }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async getAuthorArticleList(ctx: KoaCtx) {
    try {
      const articleList = await Article.find(
        { author: ctx.params.userId },
        '_id title keywords author desc create_time update_time'
      ).populate('author', ['name', 'avatar'])

      if (articleList.length) {
        ctx.body = { success: true, articleList }
      } else {
        ctx.body = { success: false, msg: '当前未发布内容' }
      }
    } catch (e: any) {
      ctx.body = { success: false, msg: e.message }
    }
  }
}

export const articleController = new ArticleController()
