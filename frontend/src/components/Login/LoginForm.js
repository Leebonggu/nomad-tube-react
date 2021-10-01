/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Warning, Button } from 'components/common';

const Form = styled.form`
  flex: 1;
  display: flex;
  margin: 1rem;
  flex-direction: column;
  button {
    margin-top: 2rem;
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

const NoId = styled(Link)`
  margin-top: 1rem;
  text-decoration: none;
  color: blue;

  &:hover {
    color: skyblue;
  }
`;


function LoginForm({ register, handleSubmit, errors, onSubmit }) {
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
      <Input type="password" {...register('password', { required: true })}/>
      {errors.password && <Warning>패스워드에 오류가 있습니다</Warning>}
      <Button type="submit">로그인</Button>
      <NoId to="/signup">아이디가 없으신가요?</NoId>
    </Form>
  )
}

export default LoginForm;

LoginForm.propTypes = {
  register: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.any).isRequired,
};