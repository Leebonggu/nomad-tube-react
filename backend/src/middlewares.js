import multer from "multer";
import multerS3 from "multer-s3";
import aws from 'aws-sdk';

const isHeroku = process.env.NODE_ENV === 'production';

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const s3ImageUploader = multerS3({
  s3,
  bucket: 'nomadtubee/images',
  acl: 'public-read'
});

const s3VideoUploader = multerS3({
  s3,
  bucket: 'nomadtubee/videos',
  acl: 'public-read'
});

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.user = req.user || {};
  next();
};

export const protectorMiddleware  = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(400).send({ msg: '로그인된 유저가 아닙니다', isLoggedIn: false });
  }
};

export const publicOnlyMiddleware =  (req, res, next) => {
  if (!req.user) {
    next();
  } else {
    return res.status(400).send({ msg: '이미 로그인 되어 있습니다', isLoggedIn: true });
  }
};

export const avatarUpload = multer({
  dest: 'uploads/avatars/',
  limits: {
    fileSize: 3000000,
  },
  storage: s3ImageUploader,
});

export const videoUpload = multer({
  dest: 'uploads/videos/', 
  limits: {
    fileSize: 100000000,
  },
  storage: s3VideoUploader,
});