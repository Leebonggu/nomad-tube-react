import User from '../models/User';
import Video from '../models/Video';

export const home = async (req, res) => {
  const videos = await Video.find({})
    .sort({ createdAt: 'desc' })
    .populate("owner");
  return res.status(200).send(videos);
};

export const watch = async (req, res) => {
  // console.log(req);
  const { id } = req.params;
  console.log(id);
  const video = await Video.findById({ _id: id }).populate('owner').populate('comments');
  console.log(video);
  if (!video) {
    return res.status(404).send({ msg: '비디오가 없습니다', video: [] });
  }
  return res.status(200).send({ msg: '비디오를 불러왔습니다.', video });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const { user : { _id }} = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.render('404', { pageTitle: 'Video not found.' });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  return res.render('edit', { pageTitle: `Editing`, video });
};

export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { user : { _id }} = req.session;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  const { title, description, hashtags } = req.body;
  const updateddVideo = await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags)
  });
  if (String(updateddVideo.owner) !== String(_id)) {
    return res.status(403).redirect('/');
  }
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render('upload');
};

export const postUpload = async (req, res) => {
  console.log('업로드 시작');
  console.log(req.body);
  console.log(req.file);
  console.log(req.user);
  const { _id } = req.user;
  const { path: fileUrl } = req.file;
  const { title, description, hashtags } = req.body;
  console.log(fileUrl, title, description, hashtags)
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags)
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.status(201).send({ msg: '업로드 완료', userId: _id });
  } catch (error) {
    console.log(error);
    return  res.status(400).send({ msg: error._message });
  }
};

export const getDelete = async (req, res) => {
  const { id } = req.params;
  const { user : { _id }} = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  if (String(video.owner) !== String(_id)) {
    console.log('inner');
    return res.status(403).redirect('/');
  }

  await Video.findByIdAndDelete(id);
  return res.redirect('/');
};

export const search = async (req, res) => {
  const { keyword } = req.query;
  console.log(keyword);
  let videos = [];
  if (keyword) {
    videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, "i"),
      },
    }).populate("owner");
  }
  return res.status(200).send({ videos, msg: '성공' });
};

export const registerView = async (req, res) => {
  console.log('views');
  const { id } = req.params;
  const video = await Video.findByIdAndUpdate(id);
  if (!video) {
    return res.sendStatus(404);
  }
  video.meta.views += 1;
  await video.save();
  return res.sendStatus(200);
};
