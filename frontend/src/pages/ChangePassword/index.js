import React, { useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ChangePasswordForm from 'components/ChangePassword/ChangePasswordForm';
import useInput from 'hooks/useInput';
import AuthContext from 'context/AuthContext';

const ChangePasswordContainer = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


const MePhoto = styled.img`
  border: 1px solid green;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

function ChangePassword() {
  const history = useHistory();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [oldPassword, handleOldPassword] = useInput('');
  const [newPassword, handleNewPassword] = useInput('');
  const [newPasswordConfirm, handleNewPasswordConfirm] = useInput('');
  const [error, _, setError] = useInput('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      oldPassword,
      newPassword,
      newPasswordConfirm,
    };
    axios.post('/apis/users/change-password', data)
      .then(() => {
        setIsLoggedIn(false);
        return history.push('/')
      })
      .catch((err) =>{
        const { data: { msg } } = err.response; 
        setError(msg);
      });
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
