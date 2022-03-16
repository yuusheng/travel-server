const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI

//实例化koa对象
const app = new koa()
const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = { msg: 'Hello koa Interface' }
})
mongoose
  .connect(db)
  .then(() => {
    console.log('mongodb 连接成功')
  })
  .catch((err) => {
    console.log(err)
  })
// 配置路由
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log('server start on' + port)
})
