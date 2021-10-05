import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'components/common';

const Form = styled.form`
    /* flex: 1; */
    width: 480px;
    height: 560px;
    display: flex;
    margin: 1rem;
    flex-direction: column;
    button {
      margin-top: 2rem;
    }
    @media screen and (max-width: 768px) {
    width: 360px;
    height: 400px;
  }
`;

const Label = styled.label`
  margin: 1rem 0;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  height: 3rem;
`;

function EditProfileForm({
    currentUserData,
    handleLocation,
    handleSubmit,
    handleImage,
    error,
  }) {
  return (
    <Form onSubmit={handleSubmit}>
      <Label>AVATAR</Label>
      <Input type="file" name="avatar" accept="image/*" encType="multipart/form-data" onChange={handleImage} />
      <Label>LOCATION</Label>
      <Input type="text" onChange={handleLocation} value={currentUserData.location}/>
      <Button type="submit">업데이트</Button>
    </Form>
  )
}

export default EditProfileForm;

EditProfileForm.propTypes = {
  handleLocation: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleImage: PropTypes.func.isRequired,
  currentUserData: PropTypes.objectOf(PropTypes.any).isRequired,
  error: PropTypes.string,
};

EditProfileForm.defaultProps = {
  error: '',
};
