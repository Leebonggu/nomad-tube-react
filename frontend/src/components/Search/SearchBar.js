import { Button } from 'components/common';
import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.form`
  width: 100%;
  margin: 3rem 0;

`;

const InputContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Input = styled.input`
  width: 30rem;
  padding: 10px;
  border-radius: 5px;
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
