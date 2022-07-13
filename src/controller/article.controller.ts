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
}

export const articleController = new ArticleController()
