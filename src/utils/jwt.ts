import { config, requireAuthentication } from './secret'
import { KoaCtx, KoaNext } from '../types'
import jwt from 'jsonwebtoken'

export function custom(ctx: KoaCtx) {
  return requireAuthentication.includes(ctx.url) ? false : true
}

export function generateToken(payload: any) {
  return jwt.sign(payload, config.secret, { expiresIn: config.expiresTime })
}

export async function jwtErrorHandler(ctx: KoaCtx, next: KoaNext) {
  return next().catch((err: any) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      }
    } else {
      throw err
    }
  })
}
