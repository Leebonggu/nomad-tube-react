import express from 'express';
import { home, search } from '../controllers/videoController';
import { postJoin, postLogin, getLogin } from '../controllers/userController';
import { publicOnlyMiddleware } from '../middlewares';

const router = express.Router();

router.get('/', home);
router
  .route('/join')
  .post(postJoin)
router
  .route('/login')
  .get(getLogin)
  .post(postLogin);
router.get('/search', search);

export default router;