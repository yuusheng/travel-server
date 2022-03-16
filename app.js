const koa = require('koa')
const Router = require('koa-router')

//实例化koa对象
const app = new koa()
const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = { msg: 'Hello koa Interface' }
})

// 配置路由
app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log('server start on' + port)
})
