import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import EditProfileForm from 'components/EditProfile/EditProfileForm';

const EditProfileContainer = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const MePhoto = styled.img`
  border: 1px solid green;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

function EditProfile() {
  const history  = useHistory();
  const [currentUserData, setCurrentUserData] = useState({});
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState('');
  useEffect(() => {
    axios.get(`/apis/users/edit`)
      .then(({ data }) => {
        const { user } = data;
        setCurrentUserData(user);
        setImageFile(user.avatarUrl)
      })
  }, []);


  const handleLocation = (e) => {
    const { value } = e.target;
    const newUserData = { ...currentUserData, location: value };
    setCurrentUserData(newUserData);
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
    formData.append('location', currentUserData.location);
    axios.post('/apis/users/edit', formData)
      .then(({ data }) => {
        const { updatedUser } = data;
        setCurrentUserData(updatedUser);
        return history.push('/')
      })
      .catch((err) => {
        const{ data: { msg } } = err.response;
        setError(msg);
      });
  };

  return (
    <EditProfileContainer>
      {currentUserData.avatarUrl ?<MePhoto src={currentUserData.avatarUrl}/> : '없음'}
      <EditProfileForm
        currentUserData={currentUserData}
        handleLocation={handleLocation}
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        error={error}
      />
    </EditProfileContainer>
  )
}

export default EditProfile
