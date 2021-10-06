import mongoose from 'mongoose';
  
const DB_URL = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL_PRODUCTION : process.env.MONGO_URL;

console.log(process.env.NODE_ENV);
console.log("DB_URL",DB_URL);

mongoose.connect(process.env.MONGO_URL_PRODUCTION , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

const handleOpen = () => console.log('connect DB');
const handleError = (err) => console.log(`db error: ${err}`);

db.on('error', handleError);
db.once('open', handleOpen);