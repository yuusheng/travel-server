import type { KoaCtx } from '../types'
import { User } from '../models'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils'

class UserController {
  constructor() {}

  async login(ctx: KoaCtx) {
    try {
      const user = ctx.request.body.email
        ? await User.find({ email: ctx.request.body.email })
        : await User.find({ name: ctx.request.body.name })

      // do not exist
      if (!user.length) {
        ctx.status = 200
        ctx.body = { success: false, code: 101, msg: '用户不存在' }
      } else {
        const { id, name, password, avatar, email } = user[0]
        // check password
        const result = bcrypt.compareSync(ctx.request.body.password, password)
        if (result) {
          const payload = {
            id,
            name,
            avatar,
            email,
          }
          // generate token
          const token = generateToken(payload)
          ctx.status = 200
          ctx.body = {
            success: true,
            token: 'Bearer ' + token,
          }
        } else {
          ctx.status = 200
          ctx.body = {
            success: false,
            code: 102,
            msg: '密码错误',
          }
        }
      }
    } catch (e) {
      ctx.body = { msg: '数据库出错', code: 106, success: false }
      return
    }
  }

  async current(ctx: KoaCtx) {
    let { id, name, avatar, email } = ctx.state.user
    avatar = avatar.slice(2)
    ctx.body = { id, name, avatar, email }
    console.log(ctx.state.user)
  }
}

export const userController = new UserController()
