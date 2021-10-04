import multer from "multer";

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
  }
});

export const videoUpload = multer({
  dest: 'uploads/videos/', 
  limits: {
    fileSize: 100000000,
  }
});