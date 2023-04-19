import { Router } from 'https://deno.land/x/oak/mod.ts';
import controllers from '../controllers/index.ts';
import middlewares from '../middlewares/index.ts';

const router = new Router();
router.post('/api/v1/user/login', controllers.userLogin).post('/api/v1/user/register', controllers.userRegister);

router.get('/api/v1/videos', controllers.videosGetList).post('/api/v1/videos/share', middlewares.authenticate, controllers.videosShare);

export default router;
