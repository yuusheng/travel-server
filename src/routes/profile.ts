import { profileController } from '../controller'
import Router from 'koa-router'

const router = new Router({ prefix: '/profile' })

router.get('/', profileController.currentProfile)

router.post('/', profileController.setProfile)

export default router.routes()
