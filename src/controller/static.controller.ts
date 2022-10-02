import path from 'path'
import type { KoaCtx } from '../types'

class StaticController {
  async publishImg(ctx: KoaCtx) {
    const file = (ctx.request.files as any).files.filepath
    const baseName = path.basename(file)
    ctx.body = { url: `${ctx.origin}/uploads/${baseName}` }
  }
}

export const staticController = new StaticController()
