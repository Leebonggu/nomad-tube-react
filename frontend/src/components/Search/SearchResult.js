import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchResultContainer = styled.div`
  flex: 3;
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;


function SearchResult({ videos }) {
  return (
    <SearchResultContainer>
      {videos.length ? (
        <div>비디오</div>
      ) : (
      <div>결과가 없습니다</div>
      )}
    </SearchResultContainer>
  )
}

export default SearchResult;

SearchResult.propTypes = {
  videos: PropTypes.oneOfType([
    () => null,
    PropTypes.object
  ]).isRequired
}
