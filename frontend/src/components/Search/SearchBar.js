import { Button } from 'components/common';
import React from 'react';
import styled from 'styled-components';

const SearchBarContainer = styled.form`
  flex: 1;
  /* margin: 3rem 0; */
  display: flex;
`;

const InputContainer = styled.div`
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
  @media screen and (max-width: 768px) {
    width: 20rem;
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
