import bcrypt from 'bcrypt';
import passport from 'passport';
import User from '../models/User';
import fetch from 'node-fetch';

export const postJoin = async (req, res) => {
  const { email, password, passwordConfirm, location } = req.body;
  if (password !== passwordConfirm) {
    return res.status(400).send({ msg: '비밀번호가 틀립니다' });
  }
  const exist = await User.exists({$or: [{ email }]});
  if (exist) {
    return res.status(400).send({ msg: '이미 존재하는 아이디입니다' });
  }
  try {
    await User.create({
      email,
      password,
      location,
    });
    return res.status(200).send({ msg: '회원가입 성공' });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: '비밀번호가 다릅니다' });
  }
};

export const getLogin = (req, res) => {
  if (req.user) {
    return res.status(200).send({ msg: 'Login', isLoggedIn: true, userId: req.user._id });
  }
  return res.status(200).send({ msg: 'Login', isLoggedIn: false });
};

export const postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send({ msg: info.reason });
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      // res.setHeader에 쿠카기 들어감
      // 서버에 통채로 들고있는건 세션
      // 근데 모든 정보를 들고있으면 무거움
      return res.status(200).send({ isLoggedIn: true, userId: user._id });
    })
  })(req, res, next);
}

export const startGithubLogin = (req, res) => {
  const cliendId = process.env.GITHUB_CLIENT;
  const config = {
    client_id: cliendId,
    allow_signui: false,
    scope:  'read:user user:email',
  }
  const params = new URLSearchParams(config).toString();
  const finalUrl = `https://github.com/login/oauth/authorize?${params}`;
  return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = 'https://github.com/login/oauth/access_token';
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const data =  await fetch(finalUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    }
  });
  const json = await data.json();
  if ('access_token' in json) {
    const { access_token } = json;
    const apiUrl = 'https://api.github.com'
    const userData = await ( 
      await fetch(`${apiUrl}/user`, {
      headers: {
        Authorization: `token ${access_token}`,
      }
    })).json();
    const emailData = await ( 
      await fetch(`${apiUrl}/user/emails`, {
      headers: {
        Authorization: `token ${access_token}`,
      }
    })).json();
    const emailObj = emailData.find(email => email.primary === true && email.verified === true);
    if (!emailObj) {
      return res.redirect('/login');
    }
    let user = await  User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        avatarUrl: userData.avatar_url,
        // username: userData.login,
        email: emailObj.email,
        password: '',
        socialOnly: true,
        location: userData.location,
      });
    }
    // create Account
    req.user = user;
    return res.status(200).send({ isLoggedIn: true, userId: user._id })
} else {
    return res.redirect('/login');
  }
};

export const getEdit = async (req, res) =>  {
  const { _id } = req.user;
  const user = await User.findById({ _id });
  const data = { location: user.location, avatarUrl: user.avatarUrl ? user.avatarUrl : ''};
  return res.status(200).send({ msg: '성공', user: data });
};

export const postEdit = async (req, res) =>  {
  const {_id: id, avatarUrl } = req.user;
  const { location } = req.body;
  const { file } = req;
  
  const updatedUser = await User.findByIdAndUpdate(id, {
    avatarUrl: file ? file.location : avatarUrl,
    location,
  }, { new: true });
  req.user = updatedUser;
  // 이미 있는 경우, 업데이트를 넘겨줌
  const data = { location: updatedUser.location, avatarUrl: updatedUser.avatarUrl ? updatedUser.avatarUrl : ''};
  return res.status(200).send({ msg: '성공', updatedUser: data });
};

export const postChangePassword =  async (req, res) => {
  const { _id: id } = req.user;
  const {
    oldPassword,
    newPassword,
    newPasswordConfirm,
  } = req.body;
  const ok = await bcrypt.compare(oldPassword, req.user.password);
  if (!ok) {
    return res.status(400).send({ msg: '기존 비빌번호가 틀림' });
  }
  if (newPassword !== newPasswordConfirm) {
    return res.status(400).send({ msg: '새 비밀번호가 틀림' });
  }
  const user = await User.findById({ _id: id });
  user.password = newPassword;
  await user.save();
  req.user.password = user.password;
  req.logout();
  req.session.destroy();
  
  return res.status(200).send({ msg: '패스워드변경완료' });
};

export const remove = (req, res) =>  res.send('/remove');

export const profile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({_id: id}).populate('videos').populate({
    path: 'videos',
    populate: {
      path: 'owner',
      model: 'User',
    },
  });
  if (!user) {
    return res.status(400).send({ msg: '등록되지 않은 유져입니다'});
  }
  const profileData = {
    userId: user._id,
    videos: user.videos,
    avatarUrl: user.avatarUrl ?  user.avatarUrl : '',
  };
  return res.status(200).send({ msg: '유자 업로드 비디오', profileData });
};

export const logout = (req, res) =>  {
  console.log('logouyt');
  req.logout();
  req.session.destroy();
  return res.status(200).send({ msg: '로그아웃이 성공적으로 이루어졌습니다', isLoggedIn: false });
};