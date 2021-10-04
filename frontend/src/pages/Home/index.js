import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Container } from 'styles/common';
import VideoList from 'components/Video/VideoList';
import AuthContext from 'context/AuthContext';

const HomeContainer = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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
  )
}

export default Home
