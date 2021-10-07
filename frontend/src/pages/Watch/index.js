/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import { Button } from 'components/common';
import useInput from 'hooks/useInput';
import CommentForm from 'components/Comment/CommentForm';
import CommentList from 'components/Comment/CommentList';

const WatchContainer = styled.div`
  margin-top: 2rem;
  width: 100%;  
  /* height: 100%; */
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const WatchContents = styled.div`
  display: flex;
  flex-direction: column;
  button {
    width: 5rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 768px) {
      margin-bottom: none;
    }
  }
  h1 {
    flex: 1;
    display: flex;
    align-items: center;
  }
  video {
    flex: 4;
    width: 960px;
    height:560px;
    @media screen and (max-width: 768px) {
      width: 480px;
      height: 240px;
    }
  }
  .info {
    flex: 1;
    margin: 1rem 0;
    .hashtag {
      color: gray;
    }
  }
`;

const CommentContainer = styled.div`
  height: 20rem;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    height: 15rem;
  }
`;

const DateSpliter = (date) => {
  const splited = date.split('T');
  return `${splited[0]} ${splited[1].slice(0, -5)}`;
};

function Watch() {
  const history = useHistory();
  const { id } = useParams();
  const { userId } = useContext(AuthContext);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, handleText, setText] = useInput('');

  useEffect(() => {
    axios.get(`/apis/videos/${id}`)
      .then(({ data }) => {
        const { video } = data;
        setCurrentVideo(video);
        setComments(video.comments);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelteVideo = () => {
    axios.get(`/apis/videos/${id}/delete`)
      .then(({ data }) => history.push('/'))
      .catch((err) => console.log(err));
  };

  // eslint-disable-next-line consistent-return
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!userId) {
      setText('');
      return alert('로그인이 필요합니다');
    }
    if (text) {
      axios.post(`/apis/common/videos/${id}/comment`, { text })
        .then(({ data }) => {
          const { newComment } = data;
          setComments([newComment, ...comments ]);
          setText('');
        })
        .catch((err) => console.log(err.response))
    } else {
      alert('댓글을 입력해야합니다');
    }
  };

  const handleDeleteComment = (commentId) => {
    axios.delete(`/apis/common/videos/${id}/comment`, { data: { commentId } })
      .then(({ data }) => {
        const { video } = data;
        setComments([ ...video.comments ]);
      })
      .then((err) => console.log(err.response));
  };

  return (
    <WatchContainer>
      {currentVideo && (
        <>
          <WatchContents>
            <h1 className="title">{currentVideo.title}</h1>
            <Button onClick={history.goBack}>뒤로</Button>
            <video
              src={currentVideo.fileUrl}
              controls
            />
            <div className="info">
              <h5 className="create">{DateSpliter(currentVideo.createdAt)}</h5>
              <h3 className="description">{currentVideo.description}</h3>
              <div className="hashtag">{currentVideo.hashtags}</div>
              <h4 className="owner">{currentVideo.owner.email}</h4>
              {userId === currentVideo.owner._id && <Button onClick={handleDelteVideo}>삭제</Button>}
            </div>
          </WatchContents>
          <CommentContainer>
            <CommentForm 
              comment={text}
              handleComment={handleText}
              handleSubmitComment={handleSubmitComment}
              userId={userId}
            />
            <CommentList
              comments={comments}
              handleDeleteComment={handleDeleteComment}
              userId={userId}
            />
          </CommentContainer>
        </>
      )}
    </WatchContainer>
  )
}

export default Watch;
