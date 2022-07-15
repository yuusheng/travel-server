import Koa from 'koa'
import koaBody from 'koa-body'
import logger from 'koa-logger'
import koaStatic from 'koa-static'
import jwt from 'koa-jwt'
import router from './routes'
import path from 'path'
import { config, custom } from './utils'
import mongoose from 'mongoose'

const app = new Koa()

app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      }
    } else {
      throw err
    }
  })
})

app.use(
  jwt({
    secret: config.secret,
  }).unless({
    custom,
  })
)

app
  .use(
    koaBody({
      multipart: true, // 文件支持格式
      formidable: {
        // 不要使用相对路径
        uploadDir: path.resolve(__dirname, '../public/uploads'), // 上传目录
        keepExtensions: true, // 设置文件后缀名保留
      },
    })
  )
  .use(koaStatic(path.resolve(__dirname, '../public')))
app.use(logger())

// logger
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

mongoose
  .connect(config.MongoURI)
  .then(() => {
    console.log('mongodb 连接成功')
  })
  .catch((e) => {
    console.error(e)
  })
// router
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || config.port

const server = app.listen(port, () => {
  console.log('server start on port http://localhost:' + port)
})

export { server, app }
