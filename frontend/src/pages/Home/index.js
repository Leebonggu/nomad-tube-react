import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import VideoList from 'components/Video/VideoList';

const HomeContainer = styled.div`
  flex: 8;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  /* height: 100%; */
`;

function Home() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    axios.get('/apis/root')
      .then(({ data }) => {
        setVideos(data);
      })
      .catch((e) => {
        setError(e);
      });
  }, []);

  return (
    <HomeContainer>
      <VideoList videos={videos}/>
    </HomeContainer>
  );
}

export default Home
