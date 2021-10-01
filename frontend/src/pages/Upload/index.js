import React, { useState } from 'react';
import styled from 'styled-components';
import { Container } from 'styles/common';

const UploadContainer = styled(Container)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


function Upload() {
  return (
    <UploadContainer>
      Upload
    </UploadContainer>
  )
}

export default Upload;
