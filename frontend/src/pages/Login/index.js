import React, { useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { black, white } from 'styles/color';
import { Container } from 'styles/common';
import LoginForm from 'components/Login/LoginForm';
import useInput from 'hooks/useInput';
import { Button, Warning } from 'components/common';
import { useHistory, Redirect } from 'react-router';
import AuthContext from 'context/AuthContext';

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
  const { setIsLoggedIn } = useContext(AuthContext);
  const [error, _, setError] = useInput(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = ({ email, password }) => {
    axios.post('/apis/root/login',
      { email, password },
    )
      // eslint-disable-next-line consistent-return
      .then(({ data }) => {
        const { isLoggedIn } = data;
        setIsLoggedIn(isLoggedIn);
        history.push('/');
      })
      .catch((e) => {
        const { msg } = e.response.data;
        console.log(msg);
        setError(msg);
      })
  };

  const handleGithubLogin = () => {
    // axios.get('/')
  }

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
        <SocialLoginContainer>
          <SocialLoginText>소셜로그인</SocialLoginText>
          <SocialLoginButtonContainer>
            <Button big onClick={handleGithubLogin}>GITHUB</Button>
          </SocialLoginButtonContainer>
        </SocialLoginContainer>
      </LoginContents>
    </LoginContainer>
  );
}

export default Login
