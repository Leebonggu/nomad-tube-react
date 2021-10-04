import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import apis from './routers';
import { localMiddleware } from './middlewares';
import passportConfig from './passport';

const app = express();
const logger = morgan('dev');

// const corsOptions = {
//   origin: true,
//   credentials : true,
//   optionsSuccessStatus: 200 // 응답 상태 200으로 설정 
// };/

// app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use('/uploads', express.static('uploads'));
passportConfig();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('assets'));
app.use(cookieParser(process.env.COOKIE_SECRET,));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  // store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(localMiddleware);
app.use('/apis', apis);

export default app;
