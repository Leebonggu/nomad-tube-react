/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import PropTypes from  'prop-types';
import { Button, Warning } from 'components/common';

const UploadFormContainer = styled.form`
  flex: 1;
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    margin-top: 10px;
  }
`;

const Label = styled.label`
  margin: 5px 0;
`;

const Input = styled.input`
  /* width:rem; */
  width: 100%;
  height: 3rem;
`;

function UploadForm({
  register,
  onSubmit,
  handleSubmit,
  errors,
}) {
  return (
    <UploadFormContainer onSubmit={handleSubmit(onSubmit)}>
      <h1>VIDEO 업로드</h1>
      <Label>파일</Label>
      <Input type="file" name="video" accept="video/*" encType="multipart/form-data" {...register('file', { required: true })} />
      {errors.file && <Warning>File is required</Warning>}
      <Label>이름</Label>
      <Input type="text" {...register('title', { required: true })} placeholder="비디오 이름을 써주세요" />
      {errors.title && <Warning>Title is required</Warning>}
      <Label>설명</Label>
      <Input type="text" {...register('description', { required: true })} placeholder="비디오 설명을 써주세요" />
      {errors.description && <Warning>description is required</Warning>}
      <Label>헤쉬태그</Label>
      <Input type="text" {...register('hashtag')} placeholder="콤마로 구분합니다" />
      <Button type="submit">업로드</Button>
    </UploadFormContainer>
  );
}

export default UploadForm;

UploadForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
}
