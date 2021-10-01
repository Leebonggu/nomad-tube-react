import React from 'react';
import styled from 'styled-components';

const MeContainer = styled.div`
  flex: 1;
  margin: 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

`;

const MePhoto = styled.img`
  border: 1px solid green;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

function Me() {
  return (
    <MeContainer>
      <MePhoto src="https://i.guim.co.uk/img/media/b03ec3ca8b7b3c81a916520f6ca33a576bff84e7/0_328_3500_2099/master/3500.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=1f26a8055010e6b538c9961e33b20d7b"/>
    </MeContainer>
  )
}

export default Me;
