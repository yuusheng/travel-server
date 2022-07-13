import type { KoaCtx } from '../types'
class User {
  constructor() {}

  login(ctx: KoaCtx) {
    ctx.body = { msg: 'login success' }
  }
}

export const UserController = new User()
