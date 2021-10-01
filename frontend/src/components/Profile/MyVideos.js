import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MyVideosContainer = styled.div`
  flex: 3;
  width: 100%;
  display: flex;
  justify-content: flex-start;

`;



function MyVideos({ videos }) {
  return (
    <MyVideosContainer>
      {videos.length ? (
        <div>비디오</div>
      ) : (
      <div>내가 업로드한 비디오가 없습니다.</div>
      )}
    </MyVideosContainer>
  )
}

export default MyVideos;

MyVideos.propTypes = {
  videos: PropTypes.oneOfType([
    () => null,
    PropTypes.object
  ]).isRequired
}

