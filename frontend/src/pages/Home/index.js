import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from 'styles/common';
import VideoList from 'components/Video/VideoList';

const HomeContainer = styled(Container)`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

function Home() {
  return (
    <HomeContainer>
      <VideoList />
    </HomeContainer>
  )
}

export default Home
