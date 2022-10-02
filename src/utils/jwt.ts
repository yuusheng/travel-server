import jwtGenerate from 'jsonwebtoken'
import jwt from 'koa-jwt'
import type { KoaCtx, KoaNext } from '../types'
import { config } from './secret'

export function generateToken(payload: any) {
  return jwtGenerate.sign(payload, config.secret, {
    expiresIn: config.expiresTime,
  })
}

export async function jwtErrorHandler(ctx: KoaCtx, next: KoaNext) {
  return next().catch((err: any) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message,
      }
    }
    else {
      throw err
    }
  })
}

export const auth = jwt({ secret: config.secret })
