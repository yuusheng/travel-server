const Router = require('koa-router')
const router = new Router()
const article = require('./article')
const users = require('./users')
const profile = require('./profile')

router.use('/api/article', article)
router.use('/api/users', users)
router.use('/api/profile', profile)

module.exports = router
