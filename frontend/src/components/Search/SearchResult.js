import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoList from 'components/Video/VideoList';

const SearchResultContainer = styled.div`
  flex: 3;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  height: 80vh;

  .empty {
    height: 100vh;
  }
`;


function SearchResult({ videos }) {
  return (
    <SearchResultContainer>
      {videos.length ? (
        <VideoList videos={videos}/>
      ) : (
      <div className="empty">결과가 없습니다</div>
      )}
    </SearchResultContainer>
  )
}

export default SearchResult;

SearchResult.propTypes = {
  videos: PropTypes.oneOfType([
    () => null,
    PropTypes.array
  ]).isRequired
}
