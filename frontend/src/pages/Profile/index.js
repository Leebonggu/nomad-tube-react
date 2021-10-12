import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container } from 'styles/common';
import Me from 'components/Profile/Me';
import MyVideos from 'components/Profile/MyVideos';
import LoadingSpinner from 'common/loadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, resetUserInfo } from 'modules/auth';

const ProfileContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Profile() {
  const { userId, userData } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo(userId));
    return () => dispatch(resetUserInfo())
  }, [userId, dispatch]);
  if (!userData) return <LoadingSpinner />
  return (
    <ProfileContainer>
      <Me avatar={userData.avatarUrl} />
      <MyVideos videos={userData.videos}/>
    </ProfileContainer>
  )
}

export default Profile;
