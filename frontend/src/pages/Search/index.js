import React, { useState } from 'react';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import SearchBar from 'components/Search/SearchBar';
import SearchResult from 'components/Search/SearchResult';
import { Container } from 'styles/common';

const SearchContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


function Search() {
  const [searchTerms, handleSearchTerms] = useInput('');
  const [videos, setVideos] = useState([]);
  return (
    <SearchContainer>
      <SearchBar handleSearchTerms={handleSearchTerms} />
      <SearchResult videos={videos} />
    </SearchContainer>
  )
}

export default Search
