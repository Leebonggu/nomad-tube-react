/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import AuthContext from 'context/AuthContext';
import { Button } from 'components/common';

const WatchContainer = styled.div`
width: 100%;  
  height: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    height: 80vh;
  }
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

const DateSpliter = (date) => {
  const splited = date.split('T');
  return `${splited[0]} ${splited[1].slice(0, -5)}`;
};

function Watch() {
  const history = useHistory();
  const { id } = useParams();
  const [currentVideo, setCurrentVideo] = useState(null);
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`/apis/videos/${id}`)
      .then(({ data }) => {
        const { video } = data;
        setCurrentVideo(video)
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleDlelete = () => {
    axios.get(`/apis/videos/${id}/delete`)
      .then(({ data }) => history.push('/'))
      .catch((err) => console.log(err));
  }
  return (
    <WatchContainer>
      {currentVideo && (
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
            {userId === currentVideo.owner._id && <Button onClick={handleDlelete}>삭제</Button>}
          </div>
        </WatchContents>
      )}
    </WatchContainer>
  )
}

export default Watch;
