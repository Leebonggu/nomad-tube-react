import React from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { black, red, white } from 'styles/color';
import { Container } from 'styles/common';
import LoginForm from 'components/Login/LoginForm';
import useInput from 'hooks/useInput';
import { Warning } from 'components/common';

const LoginContainer = styled(Container)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background: ${white};
  flex: 4;
  display: flex;
  flex-direction: columns;
  justify-content: center;
`;

function Login() {
  const [error, handleError] = useInput(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

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
      </LoginContents>
    </LoginContainer>
  );
}

export default Login
