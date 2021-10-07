import React, { useState, useCallback } from 'react';
import useInput from 'hooks/useInput';
import styled from 'styled-components';
import SearchBar from 'components/Search/SearchBar';
import SearchResult from 'components/Search/SearchResult';
import { Container } from 'styles/common';
import axios from 'axios';

const SearchContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


function Search() {
  const [searchTerms, handleSearchTerms, setSearchTerms ] = useInput('');
  const [videos, setVideos] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    axios.get(`/apis/root/search?keyword=${searchTerms}`)
      .then(({ data }) => {
        const v = data.videos;
        setVideos(v);
      });
      setSearchTerms('');
  };

  return (
    <SearchContainer>
      <SearchBar
        searchTerms={searchTerms}
        handleSearchTerms={handleSearchTerms}
        handleSearch={handleSearch}
      />
      <SearchResult videos={videos} />
    </SearchContainer>
  )
}

export default Search
