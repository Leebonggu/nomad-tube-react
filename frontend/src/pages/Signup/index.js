import React from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { black, white } from 'styles/color';
import { Container } from 'styles/common';
import SignupForm from 'components/Signup/SignupForm';
import useInput from 'hooks/useInput';
import { Warning } from 'components/common';

const SignupContainer = styled(Container)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupContents = styled.div`
  width: 500px;
  height: 750px;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 500px;
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
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const InputContainer = styled.div`
  background: ${white};
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;


function Signup() {
  const [error, _, setError] = useInput(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = ({ email, password, passwordConfirm, location }) => {
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다');
    }
    console.log(email, password, passwordConfirm, location);
  };

  return (
    <SignupContainer>
      <SignupContents>
        <Header>SIGNUP</Header>
        <InputContainer>
          <SignupForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
        />
        </InputContainer>
      </SignupContents>
    </SignupContainer>
  )
}

export default Signup;
