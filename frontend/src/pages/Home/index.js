import React from 'react';
import styled from 'styled-components';
import { Container } from 'styles/common';

const HomeContainer = styled(Container)`
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`;

function Home() {
  return (
    <HomeContainer>
      Home
    </HomeContainer>
  )
}

export default Home
