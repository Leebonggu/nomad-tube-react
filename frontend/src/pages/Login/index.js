import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { black, white } from 'styles/color';
import { Container } from 'styles/common';
import LoginForm from 'components/Login/LoginForm';
import useInput from 'hooks/useInput';
import { Button, Warning } from 'components/common';
import { useHistory, Redirect } from 'react-router';
import AuthContext from 'context/AuthContext';
import { postLoginAsync } from 'modules/auth';

const LoginContainer = styled(Container)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${white};
`;

const LoginContents = styled.div`
  width: 500px;
  height: 500px;
  min-width: 250px;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Header = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${black};
  color: ${white};
  font-weight: 700;
  font-size: 2rem;
`;

const InputContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const SocialLoginContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SocialLoginText = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const SocialLoginButtonContainer = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  button {
    width: 100%;
    background-color: ${black};
  }
`;

function Login() {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)
  const onSubmit = ({ email, password }) => {
    dispatch(postLoginAsync({ email, password })).then(res => console.log(res));
  };

  // const handleGithubLogin = () => {
  //   axios.get('/apis/users/github/start')
  //     .then(({ data }) => {
  //       const { isLoggedIn, userId } = data;
  //       setIsLoggedIn(isLoggedIn);
  //       setUserId(userId)
  //       history.push('/');
  //     });
  // }

  return (
    <LoginContainer>
      <LoginContents>
        <Header>LOGIN</Header>
        <InputContainer>
          <LoginForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
        />
        {error && <Warning>{error}</Warning>}
        </InputContainer>
        {/* <SocialLoginContainer>
          <SocialLoginText>???????????????</SocialLoginText>
          <SocialLoginButtonContainer>
            <Button big onClick={handleGithubLogin}>GITHUB</Button>
          </SocialLoginButtonContainer>
        </SocialLoginContainer> */}
      </LoginContents>
    </LoginContainer>
  );
}

export default Login
