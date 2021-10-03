import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import flash from 'express-flash';
import MongoStore from 'connect-mongo';
import apis from './routers';
import { localMiddleware } from './middlewares';

const app = express();
const logger = morgan('dev');

const corsOptions = {
  origin: true,
  credentials : true,
};

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use('/uploads', express.static('uploads'));
app.use(cors(corsOptions))
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static('assets'));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
}));
app.use(flash());
app.use(localMiddleware);
app.use('/apis', apis);

export default app;
