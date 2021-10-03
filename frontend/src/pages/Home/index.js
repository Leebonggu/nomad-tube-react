import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Container } from 'styles/common';
import VideoList from 'components/Video/VideoList';

const HomeContainer = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const loginTest = async () => {
  const result = await axios.get('/apis/root/login');
  console.log(result);
}

function Home() {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState([]);
  useEffect(() => {
    loginTest();
    axios.get('/apis/root')
      .then(({ data }) => {
        setVideos(data);
      })
      .catch((e) => {
        setError(e);
      });
  }, [])
  return (
    <HomeContainer>
      <VideoList videos={videos}/>
    </HomeContainer>
  )
}

export default Home
