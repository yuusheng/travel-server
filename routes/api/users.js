const Router = require('koa-router')
const router = new Router()
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys').secretOrKey

const User = require('../../models/User')
const passport = require('koa-passport')

router.get('/test', async (ctx) => {
  ctx.status = 200
  ctx.body = { msg: 'user works...' }
})

/**
 * * POST /api/users/login
 * @desc login
 * @access public
 */
router.post('/login', async (ctx) => {
  // check
  const user = ctx.request.body.email
    ? await User.find({ email: ctx.request.body.email })
    : await User.find({ name: ctx.request.body.name })

  // do not exist
  if (!user.length) {
    ctx.status = 404
    ctx.body = { email: '用户不存在' }
  } else {
    const { id, name, password, avatar } = user[0]
    // check password
    const result = bcrypt.compareSync(ctx.request.body.password, password)
    if (result) {
      // * return token
      const payload = {
        id,
        name,
        avatar,
      }
      // generate token
      const token = jwt.sign(payload, keys, { expiresIn: 3600 })
      ctx.status = 200
      ctx.body = {
        success: true,
        token: 'Bearer ' + token,
      }
    } else {
      ctx.status = 400
      ctx.body = {
        password: '密码错误',
      }
    }
  }
})

/** POST /api/users/register
 * @desc register
 * @access public
 */
router.post('/register', async (ctx) => {
  // ctx.body = ctx.request.body
  const findResult = await User.find({ email: ctx.request.body.email })
  // 邮箱已被注册则不能继续使用
  if (findResult.length) {
    ctx.status = 500
    ctx.body = {
      email: '邮箱已被占用',
    }
  } else {
    const reqBody = ctx.request.body
    // 全球公认头像
    const avatar = gravatar.url(reqBody.email, { s: '200', r: 'pg', d: 'mm' })
    // 密码加密
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(reqBody.password, salt)
    // 创建新用户
    const newUser = new User({
      name: reqBody.name,
      email: reqBody.email,
      avatar,
      password,
    })

    // 存储到数据库
    await newUser
      .save()
      .then((user) => {
        ctx.body = user
      })
      .catch((err) => {
        console.log(err)
      })

    //返回json
    ctx.body = newUser
  }
})

/** GET api/users/current
 * @desc user info
 * @access private
 */
router.get('/current', passport.authenticate('jwt', { session: false }), async (ctx) => {
  let { id, name, avatar, email } = ctx.state.user
  avatar = avatar.slice(2)
  ctx.body = { id, name, avatar, email }
})

module.exports = router.routes()
