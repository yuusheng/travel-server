import { config } from './secret'
import { KoaCtx } from '../types'
import jwt from 'jsonwebtoken'

export function custom(ctx: KoaCtx) {
  return true
}

export function generateToken(data: any) {
  return jwt.sign(
    {
      data,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    },
    config.secret
  )
}
