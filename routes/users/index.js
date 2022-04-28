const Router = require('koa-router')
const router = new Router()
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('koa-passport')

const keys = require('../../config/keys').secretOrKey
const { expiresTime } = require('../../config/keys')
// model
const User = require('../../models/User')
const mail = require('./mail')
const controller = require('../../controller/UserController')
const VeriCode = require('../../models/VeriCode')

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
    ctx.status = 200
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
      const token = jwt.sign(payload, keys, { expiresIn: expiresTime })
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
router.post('/register', controller.verifyMail, controller.verifyCode, controller.register)

// 发送验证码
router.post(
  '/auth-code',
  async (ctx, next) => {
    const findResult = await User.find({ email: ctx.request.body.email })
    // 邮箱已被注册则不能继续使用
    if (findResult.length) {
      ctx.body = {
        success: false,
        email: '邮箱已被占用',
      }
    } else {
      // 生成验证码并挂在ctx.request上
      let code = Math.floor(Math.random() * 9000) + 1000
      ctx.request.code = code
      await next()
      // 判断当前邮箱是否已经发过验证码
      if ((await VeriCode.find({ email: ctx.request.body.email })).length) {
        await VeriCode.findOneAndUpdate(
          { email: ctx.request.body.email },
          { code: code, deadline: Date.now() + 15 * 60 * 1000 },
          { new: true }
        )
          .then((res) => {
            ctx.body = { success: true, msg: '发送成功' }
          })
          .catch((err) => {
            ctx.body = { success: false, err }
          })
      } else {
        // 没有发过验证码
        let veriCode = new VeriCode({
          email: ctx.request.body.email,
          code,
          deadline: Date.now() + 15 * 60 * 1000,
        })
        // 保存veriCode
        await veriCode
          .save()
          .then(() => {
            ctx.body = { success: true, msg: '发送成功' }
          })
          .catch((err) => {
            ctx.body = { success: false, msg: '服务器出错，请重新发送', err }
          })
      }
    }
  },
  mail
)

/** GET api/users/current
 * @desc user info
 * @access private
 */
router.get('/current', passport.authenticate('jwt', { session: false }), async (ctx) => {
  let { id, name, avatar, email } = ctx.state.user
  avatar = avatar.slice(2)
  ctx.body = { id, name, avatar, email }
})

router.post('/controller', controller.verifyCode)

module.exports = router.routes()
