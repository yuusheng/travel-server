import { Article } from '../models'
import type { KoaCtx } from '../types'

function getParams(ctx: KoaCtx, get = false) {
  const articleId = get ? ctx.params.id : ctx.request.body.id
  const { id, avatar, name }: { id: string; avatar: string; name: string }
    = ctx.state.user

  return { articleId, id, avatar, name }
}

class ArticleController {
  async getArticleDetailById(ctx: KoaCtx) {
    if (!ctx.params.id) {
      ctx.status = 200
      ctx.body = { msg: '文章不存在!' }
    }
    else {
      const id = ctx.params.id
      const article = await Article.findOne({ _id: id }).populate(
        'author',
        'name',
      )
      if (article) {
        const meta = {
          ...article.meta,
          views: (article.meta?.views as unknown as number) + 1,
        }
        await Article.updateOne({ _id: id }, { meta }).then((res) => {
          ctx.body = res
        })
      }
      else {
        ctx.body = { msg: '文章不存在' }
      }
      ctx.body = article
    }
  }

  async publishArticle(ctx: KoaCtx) {
    const length = ctx.request.body.content.length
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
        '_id title keywords author desc create_time update_time',
      ).populate('author', ['name', 'avatar'])

      console.log('userId', ctx.params.userId)
      if (articleList.length)
        ctx.body = { success: true, articleList }
      else
        ctx.body = { success: false, msg: '当前未发布内容' }
    }
    catch (e: any) {
      ctx.body = { success: false, msg: e.message }
    }
  }

  async ifLiked(ctx: KoaCtx) {
    try {
      const { articleId, id } = getParams(ctx, true)
      const article = await Article.findOne({ id: articleId })

      const liked = article?.like_users.some((user: any) => user.id === id)
      const disliked = article?.dislike_users.some(
        (user: any) => user.id === id,
      )

      ctx.body = { success: true, liked, disliked }
      ctx.status = 200
    }
    catch (e: any) {
      ctx.status = 500
      ctx.body = { success: false, message: e.message }
    }
  }

  async likeArticle(ctx: KoaCtx) {
    try {
      const { articleId, id, avatar, name } = getParams(ctx)

      const article = await Article.findOne({ id: articleId })

      if (article?.like_users.some((user: any) => user.id === id)) {
        ctx.status = 401
        ctx.body = { success: false, msg: '请勿重复点赞' }
      }
      else {
        await Article.findOneAndUpdate(
          { id: ctx.request.body.id },
          {
            $push: {
              like_users: { id, avatar, name },
            },
            $inc: {
              'meta.likes': 1,
            },
          },
        )

        ctx.status = 200
        ctx.body = { success: true }
      }
    }
    catch (e: any) {
      ctx.status = 500
      ctx.body = { success: false, message: e.message }
    }
  }

  async cancelLikeArticle(ctx: KoaCtx) {
    try {
      const { articleId, id, avatar, name } = getParams(ctx)

      const article = await Article.findById(articleId)

      if (article?.like_users.some((user: any) => user.id === id)) {
        ctx.status = 401
        ctx.body = { success: false, msg: '您还未点赞' }
      }
      else {
        await Article.findOneAndUpdate(
          { id: ctx.request.body.id },
          {
            $pull: {
              like_users: { id, avatar, name },
            },
            $inc: {
              'meta.likes': -1,
            },
          },
        )

        ctx.status = 200
        ctx.body = { success: true }
      }
    }
    catch (e: any) {
      ctx.body = { success: false, msg: e.message }
      ctx.status = 500
    }
  }

  async dislikeArticle(ctx: KoaCtx) {
    try {
      const { articleId, id } = getParams(ctx)

      const article = await Article.findOne({ id: articleId })

      if (article?.dislike_users.some((user: any) => user.id === id)) {
        ctx.status = 401
        ctx.body = { success: false, msg: '请勿重复点赞' }
      }
      else {
        await Article.findOneAndUpdate(
          { id: ctx.request.body.id },
          {
            $push: {
              dislike_users: { id },
            },
          },
        )

        ctx.status = 200
        ctx.body = { success: true }
      }
    }
    catch (e: any) {
      ctx.status = 500
      ctx.body = { success: false, message: e.message }
    }
  }

  async cancelDislikeArticle(ctx: KoaCtx) {
    try {
      const { articleId, id } = getParams(ctx)

      const article = await Article.findById(articleId)

      if (article?.dislike_users.some((user: any) => user.id === id)) {
        ctx.status = 401
        ctx.body = { success: false, msg: '您还未点赞' }
      }
      else {
        await Article.findOneAndUpdate(
          { id: ctx.request.body.id },
          {
            $pull: {
              dislike_users: { id },
            },
          },
        )

        ctx.status = 200
        ctx.body = { success: true }
      }
    }
    catch (e: any) {
      ctx.body = { success: false, msg: e.message }
      ctx.status = 500
    }
  }
}

export const articleController = new ArticleController()
