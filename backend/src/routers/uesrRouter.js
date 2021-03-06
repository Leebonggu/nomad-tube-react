import express from 'express';
import { getEdit, postEdit, remove, profile, logout, startGithubLogin, finishGithubLogin, getChangePassword, postChangePassword } from '../controllers/userController';
import { protectorMiddleware, publicOnlyMiddleware, avatarUpload } from '../middlewares';

const router = express.Router();

router.get('/logout', logout);
router
.route('/edit')
  .get(getEdit)
  .post(avatarUpload.single('avatar'), postEdit);

router.route('/change-password')
  .post(postChangePassword);

// router.get('/github/start', startGithubLogin);
// router.get('/github/finish', finishGithubLogin);
router.get('/delete', remove);
router.get('/:id', profile);

export default router;

