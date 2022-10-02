import Router from 'koa-router'
import { profileController } from '../controller'

const router = new Router({ prefix: '/profile' })

router.get('/', profileController.currentProfile)

router.post('/', profileController.setProfile)

export default router.routes()
