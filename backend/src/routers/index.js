import express from 'express';
import rootRouter from './rootRouter';
import apiRouter from './apiRouter';
import userRouter from './uesrRouter';
import videoRouter from './videoRouter';

const router = express.Router();

router.use('/root', rootRouter);
router.use('/users', userRouter);
router.use('/videos', videoRouter);
router.use('/common', apiRouter);

export default router;
