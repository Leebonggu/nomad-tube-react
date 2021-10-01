import { Button } from 'components/common';
import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.form`
  flex: 1;
  display: flex;
  align-items: center;
`;

const InputContainer = styled.div`
  display: flex;
  /* @media screen and (max-width: 768px) {
    width: 100%;
  } */
`;

const Input = styled.input`
  width: 30rem;
  border-radius: 5px;
  @media screen and (max-width: 768px) {
    width: 20rem;
  }
  @media screen and (max-width: 560px) {
    width: 14rem;
  }
`;

function SearchBar() {
  return (
    <SearchBarContainer>
      <InputContainer>
        <Input />
        <Button>검색</Button>
      </InputContainer>
    </SearchBarContainer>
  )
}

export default SearchBar;
