import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'components/common';

const MeContainer = styled.div`
  flex: 1;
  margin: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MePhoto = styled.img`
  border: 1px solid green;
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const  ButtonContainer = styled.div`
    margin: 1rem 0;
    button {
      margin: 1rem;
    }

    @media screen and (max-width: 768px) {
      display: flex;
      flex-direction: column;
    }
`;

function Me({ avatar }) {
  const history = useHistory();
  return (
    <MeContainer>
      <MePhoto src={avatar} />
      <ButtonContainer>
        <Button onClick={() => {history.push('/edit-profile')}}>프로필수정</Button>
        <Button onClick={() => {history.push('/change-password')}}>비밀번호변경</Button>
      </ButtonContainer>
    </MeContainer>
  )
}

export default Me;

Me.propTypes = {
  avatar: PropTypes.string,
}

Me.defaultProps = {
  avatar: 'https://iupac.org/wp-content/uploads/2018/05/default-avatar-768x768.png',
};

