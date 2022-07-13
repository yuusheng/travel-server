import { KoaCtx } from '../types'
import path from 'path'

class StaticController {
  async publishImg(ctx: KoaCtx) {
    const file = (ctx.request.files as any).files.filepath
    const baseName = path.basename(file)
    ctx.body = { url: `${ctx.origin}/uploads/${baseName}` }
  }
}

export const staticController = new StaticController()
