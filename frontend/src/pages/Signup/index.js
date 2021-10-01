import React from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { black, white } from 'styles/color';
import { Container } from 'styles/common';
import SignupForm from 'components/Signup/SignupForm';
import useInput from 'hooks/useInput';
import { Warning } from 'components/common';

const SignupContainer = styled(Container)`
  height: 100%;
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
  flex-direction: columns;
  justify-content: center;
`;


function Signup() {
  const [error, handleError] = useInput(null);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

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
        {error && <Warning>{error}</Warning>}
        </InputContainer>
      </SignupContents>
    </SignupContainer>
  )
}

export default Signup;
