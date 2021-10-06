import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import hpp from 'hpp';
;import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import apis from './routers';
import passportConfig from './passport';

const app = express();
let logger = morgan('dev');
passportConfig();

if (process.env.NODE_ENV === 'production') {
  logger = morgan('combined');
  app.use(helmet());
  app.use(hpp());
}

app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: ['http://localhost:3000', 'nomadtube-react.com', 'http://52.78.74.28'],
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
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/' , (req, res) => {
  console.log('/home');
  return res.send('/home');
})

app.use('/apis', apis);

export default app;
