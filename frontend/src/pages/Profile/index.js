import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Container } from 'styles/common';
import Me from 'components/Profile/Me';
import MyVideos from 'components/Profile/MyVideos';
import AuthContext from 'context/AuthContext';
import LoadingSpinner from 'common/loadingSpinner';

const ProfileContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Profile() {
  const [userData, setUserData] = useState(null);
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    axios.get(`/apis/users/${userId}`)
      .then(({ data }) => {
        const { profileData } = data;
        setUserData(profileData);
      });
  }, [userId]);
  if (!userData) return <LoadingSpinner />
  return (
    <ProfileContainer>
      <Me avatar={userData.avatarUrl} />
      <MyVideos videos={userData.videos}/>
    </ProfileContainer>
  )
}

export default Profile;
