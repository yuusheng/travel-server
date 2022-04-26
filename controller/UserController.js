// 注入model
const User = require('../models/User')
const VeriCode = require('../models/VeriCode')
// 头像
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

exports.test = async (ctx) => {
  ctx.body = { msg: 'userController is working...' }
}

// 验证邮箱是否存在
exports.verifyMail = async (ctx, next) => {
  const findResult = await User.find({ email: ctx.request.body.email })
  if (findResult.length) {
    ctx.body = {
      email: '邮箱已被占用',
      success: false,
    }
  } else {
    await next()
  }
}

// 验证验证码是否存在且是否正确
exports.verifyCode = async (ctx, next) => {
  const res = await VeriCode.findOne({ email: ctx.request.body.email })

  if (res && Date.now() < res.deadline) {
    if (res.code === ctx.request.body.code) {
      await next()
    } else {
      ctx.body = { success: false, msg: '验证码错误' }
    }
  } else {
    ctx.body = { success: false, msg: '验证码过期或不存在' }
  }
}

// 注册
exports.register = async (ctx) => {
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
      ctx.body = { success: true, user }
    })
    .catch((err) => {
      ctx.body = { success: false, err }
    })
}
