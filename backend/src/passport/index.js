import passport from 'passport';
import User from '../models/User';
import Video from '../models/Video';
import local from './passport-local';

const passportConfig = () => {
  passport.serializeUser((user, done) => {
    console.log('SerializeUser');
    done(null, user._id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      console.log('DeSerializeUser');
      const user = await User.findById({ _id: id });
      // server error, info
      done(null, user); //req.user
    } catch (err) {
      console.log(err);
      done(err);
    }
  });
  local();
};

export default passportConfig;
