import passport from "passport";
import { Strategy } from 'passport-local';
import bcrypt from 'bcrypt';
import User from "../models/User";

const LocalStrategy = async () => {
  try {
    passport.use(new Strategy({
      usernameField: 'email',
      passwordField: 'password',
      // req.body에 들어오는 이름을 설정
    }, async (email, password, done) => {
      const user = await User.findOne({ email, socialOnly: false });
      if (!user) {
        // 서버에러, 성공실패, 클라이언트에러
        return done(null, false, { reason: '존재하지 않는 사용자입니다' });
      }
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return done(null, false, { reason: '비밀번호가 틀렸습니다' });
      }
      return done(null, user);
    }));
  } catch (e) {
    console.log(e);
    return done(e);
  }
}

export default LocalStrategy;

