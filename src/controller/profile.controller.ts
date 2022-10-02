import type { KoaCtx } from '../types'
import { Profile } from '../models'

class ProfileController {
  async currentProfile(ctx: KoaCtx) {
    try {
      const profile = await Profile.find({ user: ctx.state.user.id }).populate(
        'user',
        ['name', 'avatar'],
      )
      if (profile.length) {
        ctx.status = 200
        ctx.body = profile[0]
      }
    }
    catch (e: any) {
      ctx.status = 500
      ctx.body = { msg: e.message }
    }
  }

  async setProfile(ctx: KoaCtx) {
    let profileFiles: any
    profileFiles.user = ctx.state.user.id
    Object.assign(profileFiles, ctx.request.body)
    if (ctx.request.body.birth) {
      const birth = new Date(ctx.request.body.birth)
      profileFiles.birth = birth
    }
    const profile = await Profile.find({ user: ctx.state.user.id })
    if (profile.length) {
      const profileUpdate = await Profile.findOneAndUpdate(
        { user: ctx.state.user.id },
        { $set: profileFiles },
        { new: true },
      )
      ctx.body = profileUpdate
      ctx.status = 200
    }
    else {
      await new Profile(profileFiles).save().then((profile) => {
        ctx.status = 200
        ctx.body = profile
      })
    }
  }
}

export const profileController = new ProfileController()
