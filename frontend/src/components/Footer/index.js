import React from 'react';
import styled from 'styled-components';
import { background, white } from 'styles/color';

const FooterContainer = styled.section`

  height: 30vh;
  /* padding: 2rem 0; */
  display: flex;
  margin-top: 50px;
  justify-content: space-between;
  background-color: ${background};
  color: ${white};
  align-items: center;
  
  .right {
    margin-left: 2rem;
  }
  .left {
    margin-right: 2rem;
  }
`;  

function Footer() {
  return (
    <FooterContainer>
      <div className="right">&copy; 2021 Delveloper Lee</div>
      <div className="left">
        leebonggu12@hnamail.net
      </div>
    </FooterContainer>
  )
}

export default Footer;

