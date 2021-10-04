import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Container } from 'styles/common';
import Me from 'components/Profile/Me';
import MyVideos from 'components/Profile/MyVideos';
import AuthContext from 'context/AuthContext';

const ProfileContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Profile() {
  const [videos, setVideos] = useState([]);
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`/apis/users/${userId}`)
      .then(({ data }) => {
        const { profileData: { videos: userVideos } } = data;
        setVideos(userVideos);
      });
  }, [userId]);

  return (
    <ProfileContainer>
      <Me />
      <MyVideos videos={videos}/>
    </ProfileContainer>
  )
}

export default Profile;
