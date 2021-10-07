import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'components/common';

const SearchBarContainer = styled.form`
  flex: 1;
  margin: 2rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

function SearchBar({ searchTerms, handleSearchTerms, handleSearch }) {
  return (
    <SearchBarContainer>
      <InputContainer>
        <Input value={searchTerms} onChange={handleSearchTerms} />
        <Button onClick={handleSearch}>검색</Button>
      </InputContainer>
    </SearchBarContainer>
  )
}

export default SearchBar;

SearchBar.propTypes = {
  handleSearchTerms: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchTerms: PropTypes.string,
};

SearchBar.defaultProps = {
  searchTerms: '',
};
