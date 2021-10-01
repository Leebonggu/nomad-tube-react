import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from 'styles/common';
import Me from 'components/Profile/Me';
import MyVideos from 'components/Profile/MyVideos';

const ProfileContainer = styled(Container)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


function Profile() {
  const [videos, setVideos] = useState([]);
  return (
    <ProfileContainer>
      <Me />
      <MyVideos videos={videos}/>
    </ProfileContainer>
  )
}

export default Profile;
