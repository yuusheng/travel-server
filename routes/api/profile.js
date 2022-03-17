const passport = require('koa-passport')
const Router = require('koa-router')
const router = new Router()
const Profile = require('../../models/Profile')

/** GET /api/profile/test
 * @desc login
 * @access public
 */
router.get('/test', async (ctx) => {
  ctx.status = 200
  ctx.body = { msg: 'profile working...' }
})

/** GET /api/profile
 * @desc get profile
 * @access private
 */
router.get('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const profile = await Profile.find({ user: ctx.state.user.id }).populate('user', ['name', 'avatar'])
  if (profile.length) {
    ctx.status = 200
    ctx.body = profile[0]
  }

  // todo profile内容
})

/** POST /api/profile
 * @desc set/add profile
 * @access private
 */
router.post('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const profileFiles = {}
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
      { new: true }
    )
    ctx.body = profileUpdate
    ctx.status = 200
  } else {
    await new Profile(profileFiles).save().then((profile) => {
      ctx.status = 200
      ctx.body = profile
    })
  }
})

/** GET /api/profile/other
 * @desc other info to get profile
 * @access public
 */
router.get('/other', async (ctx) => {
  ctx.status = 200
  ctx.body = ctx.query
})

module.exports = router.routes()
