import User from "../models/User";
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';

export const getJoin = (req, res) => {
  res.render('join', { pageTitle: 'Join' });
};
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
    return res.status(400).send("비밀번호가 다릅니다");
  }
};
export const getLogin = (req, res) => {
  console.log(2, req.session);
  return res.status(200).send({ msg: 'Login' })
};
export const postLogin = async (req, res) => {
  console.log('logginstart')
  const { email, password } = req.body;
  const user = await User.findOne({ email, socialOnly: false });
  if (!user) {
    return res.status(400).send({ msg: '등록된 유저가 아닙니다' });
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    return res.status(400).send({ msg: '비밀번호가 틀렸습니다' });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  console.log(1, req.session);
  // console.log(2, res.cookies);  
  return res.status(200).send({ msg: '로그인 성공', isLoggedIn: true });
};

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
        username: userData.login,
        email: emailObj.email,
        password: '',
        socialOnly: true,
        location: userData.location,
      });
    }
    // create Account
    req.session.loggedIn = true;
    req.session.user = user;
    return res.status(302).redirect('/');
} else {
    return res.redirect('/login');
  }
};

export const getEdit = (req, res) =>  {
  return res.render('edit-profile', { pageTitle: 'Edit Profile' })
};

export const postEdit = async (req, res) =>  {
  const { user: { _id: id, avatarUrl } } = req.session;
  const { name, email, username, location } = req.body;
  const { file } = req;
  
  const updatedUser = await User.findByIdAndUpdate(id, {
    avatarUrl: file ? file.path : avatarUrl,
    name,
    email,
    username,
    location,
  }, { new: true });
  req.session.user = updatedUser;
  // 이미 있는 경우, 업데이트를 넘겨줌
  return res.redirect('/users/edit')
  // return res.render('edit-profile', { pageTitle: 'Edit Profile'})
};

export const getChangePassword =  (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash('error', `Can't Change PAssword`);
    return res.redirect('/');
  }
  return res.render('users/change-password', {pageTitle: 'ChangePassword'})
};

export const postChangePassword =  async (req, res) => {
  const { user: { _id: id } } = req.session;
  const {
    oldPassword,
    newPassword,
    newPasswordConfirmation,
  } = req.body;
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render('users/change-password', {pageTitle: 'ChangePassword', errorMessage: '기존 비밀번호가 틀림'})
  }
  if (newPassword !== newPasswordConfirmation) {
    return res.status(400).render('users/change-password', {pageTitle: 'ChangePassword', errorMessage: '새 비밀번호가 틀림'})
  }
  const user = await User.findById(id);
  user.password = newPassword;
  await user.save();
  req.session.user.password = user.password;
  req.flash('info', 'Password Updated');
  return res.redirect('/users/logout');
};

export const remove = (req, res) =>  res.send('/remove');

export const see = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate('videos').populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });
  if (!user) {
    return res.status(404).render('404', { pageTitle: 'User Not Found' });
  }
  return res.render('users/profile', { pageTitle: `User Profile: ${user.name}`, user });
};

export const logout = (req, res) =>  {
  req.session.destroy();
  req.flash('info', 'ByeBye');
  return res.status(302).redirect('/');
};