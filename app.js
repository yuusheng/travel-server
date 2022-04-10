const koa = require('koa')
const Router = require('koa-router')
const mongoose = require('mongoose')
const db = require('./config/keys').mongoURI
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')

// 实例化koa对象
const app = new koa()
const router = new Router()

// 配置中间件
app.use(bodyParser())
require('./config/passport')(passport)
app.use(passport.initialize())
app.use(passport.session())

router.get('/', async (ctx) => {
  ctx.body = { msg: 'Hello koa Interface' }
})

// 连接数据库
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
// 自定路由
const routes = require('./routes/api')
app.use(routes.routes()).use(routes.allowedMethods())

// 配置路由
// const user = require('./routes/api/users')
// router.use('/api/users', user)
// const profile = require('./routes/api/profile')
// router.use('/api/profile', profile)

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log('server start on port localhost:' + port)
})
