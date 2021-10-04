import express from 'express';
import { getDelete, getEdit, getUpload, postEdit, postUpload, watch } from '../controllers/videoController';
import { protectorMiddleware, videoUpload } from '../middlewares';

const router = express.Router();

router.get('/:id', watch);

router
  .route('/:id([0-9a-z]{24})/edit')
  .get(getEdit)
  .post(postEdit)
router
  .route('/:id([0-9a-z]{24})/delete')
  .get(getDelete)
  
router
  .route('/upload')
  .get(getUpload)
  .post(videoUpload.single('video'), postUpload)
  // .all(protectorMiddleware)

export default router;

