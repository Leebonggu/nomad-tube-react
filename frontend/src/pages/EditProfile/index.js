import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import EditProfileForm from 'components/EditProfile/EditProfileForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserInformration, getUserEditInfo, postUserEditInfo } from 'modules/auth';

const EditProfileContainer = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const MePhoto = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

function EditProfile() {
  const history  = useHistory();
  // const [currentUserData, setCurrentUserData] = useState({});
  // const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState('');
  const { userData, error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserEditInfo()).then(() => {
      setImageFile(userData.avatarUrl);
    })
  }, []);


  const handleLocation = (e) => {
    const { value } = e.target;
    dispatch(changeUserInformration({ ...userData, location: value }));
  };

  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (imageFile) {
      formData.append('avatar', imageFile);
    }
    formData.append('location', userData.location);
    dispatch(postUserEditInfo(formData)).then(() => history.push('/'));
    axios.post('/apis/users/edit', formData).then(() => {
      alert('프로필이 정상적을 변경되었습니다');
    });
  };

  return (
    <EditProfileContainer>
      {userData.avatarUrl ?<MePhoto src={userData.avatarUrl}/> : '없음'}
      <EditProfileForm
        currentUserData={userData}
        handleLocation={handleLocation}
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        error={error}
      />
    </EditProfileContainer>
  )
}

export default EditProfile
