import Video from '../models/Video';
import Comment from '../models/Comment';

export const createComment = async (req, res) => {
  const {
    user,
    body: { text },
    params: { id },
  } = req;
  
  const video = await Video.findById(id).populate('owner').populate('comments');;
  if (!video) {
    return res.status(400).send({ msg:'실패, 비디오가 없습니다' });
  };
  
  const comment = await Comment.create({
    text,
    owner: user._id,
    video: id,
  });
  video.comments.push(comment);
  video.save();

  return res.status(201).send({ msg:'성공', newComment: comment,  });
};

export const deleteComment = async (req, res) => {
  const { id: videoId } = req.params;
  const { commentId } = req.body;
  const comment = await Comment.findByIdAndDelete({ _id: commentId });
  const video = await Video.findById({ _id: videoId }).populate('owner').populate('comments');;
  res.status(200).send({msg: '성공적을 삭제', video })
};