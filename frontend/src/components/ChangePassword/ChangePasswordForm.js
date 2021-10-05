import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input, Label }  from 'common/form';
import { Button, Warning } from 'components/common';

const ChangePasswordFormContainer = styled.form`
  width: 480px;
  height: 400px;
  display: flex;
  flex-direction: column;
  button {
    margin: 1rem 0;
  }
  @media screen and (max-width: 768px) {
    width: 360px;
    height: 400px;
  }
`;

function ChangePasswordForm({
  oldPassword,
  newPassword,
  newPasswordConfirm,
  handleOldPassword,
  handleNewPassword,
  handleNewPasswordConfirm,
  handleSubmit,
  error,
}) {
  return (
    <ChangePasswordFormContainer onSubmit={handleSubmit}>
      <Label>현재비밀번호</Label>
      <Input type="password" value={oldPassword} onChange={handleOldPassword} required/>
      <Label>새비밀번호</Label>
      <Input type="password" value={newPassword} onChange={handleNewPassword} required/>
      <Label>새비밀번호 확인</Label>
      <Input type="password" value={newPasswordConfirm} onChange={handleNewPasswordConfirm} required/>
      <Button type="submit">비밀번호변경</Button>
      {error && <Warning>{error}</Warning>}
    </ChangePasswordFormContainer>
  );
}

export default ChangePasswordForm;

ChangePasswordForm.propTypes = {
  oldPassword: PropTypes.string.isRequired,
  newPassword: PropTypes.string.isRequired,
  newPasswordConfirm: PropTypes.string.isRequired,
  handleOldPassword: PropTypes.func.isRequired,
  handleNewPassword: PropTypes.func.isRequired,
  handleNewPasswordConfirm: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
};

ChangePasswordForm.defaultProps = {
  error: '',
};

