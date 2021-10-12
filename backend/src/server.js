import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import apis from './routers';
import passportConfig from './passport';

const DB_URL = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL_PRODUCTION : process.env.MONGO_URL;

const app = express();
let logger = morgan('dev');

if (process.env.NODE_ENV === 'production') {
  logger = morgan('combined');
  app.use(helmet());
  app.use(hpp());
  app.use(cors({
    origin: 'http://devongu.site',
    credentials: true,
  }));
} else {
  app.use(cors({
    origin: true,
    credentials: true,
  }));
}
passportConfig();
app.use('/uploads', express.static('uploads'));

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('assets'));
app.use(cookieParser(process.env.COOKIE_SECRET,));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: DB_URL }),
  cookie: {
    httpOnly: true,
    secure: false,
    domain: process.env.NODE_ENV === 'production' && '.devongu.site'
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/' , (req, res) => {
  return res.send('/home');
})

app.use('/apis', apis);

export default app;
