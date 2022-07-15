import { config, requireAuthentication } from './secret'
import { KoaCtx } from '../types'
import jwt from 'jsonwebtoken'

export function custom(ctx: KoaCtx) {
  return requireAuthentication.includes(ctx.url) ? false : true
}

export function generateToken(payload: any) {
  return jwt.sign(payload, config.secret, { expiresIn: config.expiresTime })
}
