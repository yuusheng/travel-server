const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const key = require('./keys').secretOrKey
const mongoose = require('mongoose')
const User = mongoose.model('users')
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = key

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      const user = await User.findById(jwt_payload.id)
      if (user) {
        return done(null, user)
      } else {
        return done()
      }
    })
  )
}
