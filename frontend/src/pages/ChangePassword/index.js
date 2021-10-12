import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ChangePasswordForm from 'components/ChangePassword/ChangePasswordForm';
import useInput from 'hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { postUserChangePassword } from 'modules/auth';

const ChangePasswordContainer = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function ChangePassword() {
  const history = useHistory();
  const { error } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [oldPassword, handleOldPassword] = useInput('');
  const [newPassword, handleNewPassword] = useInput('');
  const [newPasswordConfirm, handleNewPasswordConfirm] = useInput('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      oldPassword,
      newPassword,
      newPasswordConfirm,
    };
    dispatch(postUserChangePassword(data));
  }

  return (
    <ChangePasswordContainer>
      <ChangePasswordForm
        oldPassword={oldPassword}
        newPassword={newPassword}
        newPasswordConfirm={newPasswordConfirm}
        handleOldPassword={handleOldPassword}
        handleNewPassword={handleNewPassword}
        handleNewPasswordConfirm={handleNewPasswordConfirm}
        handleSubmit={handleSubmit}
        error={error}
      />
    </ChangePasswordContainer>
  )
}

export default ChangePassword;
