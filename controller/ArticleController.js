const Article = require('../models/Article')

exports.getAuthorArticleList = async (ctx, next) => {
  try {
    const articleList = await Article.find(
      { author: ctx.params.user },
      '_id title keywords author desc create_time update_time'
    ).populate('author', ['name', 'avatar'])

    if (articleList.length) {
      ctx.body = { success: true, articleList }
    } else {
      ctx.body = { success: false, msg: '当前未发布内容' }
    }
  } catch (e) {
    ctx.body = { success: false, msg: e.message }
  }
}
