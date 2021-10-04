import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Container } from 'styles/common';
import UploadForm from 'components/Upload/UploadForm';


const UploadContainer = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignupContents = styled.div`
  width: 500px;
  height: 650px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 500px;
  }
`;

function Upload() {
  const histroy = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = ({ title, file, description, hashtags }) => {
    const formData = new FormData();
    formData.append('video', file[0]);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('hashtags', hashtags);
    axios.post('/apis/videos/upload', formData)
    .then(({ data }) => histroy.push(`/profile/${data.userId}`))
    .catch(e => console.log(e));
  };
  return (
    <UploadContainer>
      <SignupContents>
        <UploadForm
          register={register}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          errors={errors}
        />
      </SignupContents>
    </UploadContainer>
  )
}

export default Upload;
