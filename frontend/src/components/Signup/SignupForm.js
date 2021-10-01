/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'styles/common';
import { Warning } from 'components/common';

const Form = styled.form`
  flex: 1;
  display: flex;
  margin: 1rem;
  flex-direction: column;

  button {
    margin-top: 2rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;

const Label = styled.label`
  margin: 10px 0;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    margin: 2px 0;
  }
`;
const Input = styled.input`
  height: 3rem;
  @media screen and (max-width: 768px) {
    height: 2rem;
  }
`;

const NoId = styled(Link)`
  margin-top: 1rem;
  text-decoration: none;
  color: blue;

  &:hover {
    color: skyblue;
  }
`;

function SignupForm({ register, handleSubmit, onSubmit, errors }) {
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Label>
        <span>ID</span>
      </Label>
      <Input type="email" {...register('email', { required: true })} />
      {errors.email && <Warning>아이디를 입력해주세요</Warning>}
      <Label>
        <span>PASSWORD</span>
      </Label>
      <Input type="password" {...register('password', { required: true })} />
      {errors.password && <Warning>아이디를 입력해주세요</Warning>}
      <Label>
        <span>PASSWORD CONFIRM</span>
      </Label>
      <Input type="password" {...register('passwordConfirm', { required: true })} />
      {errors.passwordConfirm && <Warning>아이디를 입력해주세요</Warning>}
      <Label>
        <span>LOCATION</span>
      </Label>
      <Input type="text" {...register('location', { required: true })} />
      {errors.location && <Warning>지역을 입력해주세요</Warning>}
      <Button type="submit">회원가입</Button>
      <NoId to="/login">이미 회원이신가요?</NoId>
    </Form>
  )
}

export default SignupForm

SignupForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
};
