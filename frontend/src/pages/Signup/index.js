import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { black, white } from 'styles/color';
import { Container } from 'styles/common';
import SignupForm from 'components/Signup/SignupForm';
import { Warning } from 'components/common';
import { useDispatch, useSelector } from 'react-redux';
import { postSignup } from 'modules/auth';

const SignupContainer = styled(Container)`
  height: 100vh;
  display: flex;
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

axios.defaults.baseURL = 'http://localhost:4000';

function Signup() {
  const history = useHistory();
  const { error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = ({ email, password, passwordConfirm, location }) => {
    const data = { email, password, passwordConfirm, location }; 
    dispatch(postSignup(data));
  }

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
