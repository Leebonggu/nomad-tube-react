import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoList from 'components/Video/VideoList';

const MyVideosContainer = styled.div`
  flex: 3;
  width: 100%;;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* background-color: blue; */
  .empty {
    height: 100vh;
  }
`;

function MyVideos({ videos }) {
  return (
    <MyVideosContainer>
      {videos.length ? (
        <VideoList videos={videos}/>
      ) : (
        <div className="empty">내가 업로드한 비디오가 없습니다.</div>
      )}
    </MyVideosContainer>
  )
}

export default MyVideos;

MyVideos.propTypes = {
  videos: PropTypes.oneOfType([
    () => null,
    PropTypes.object
  ])
};

MyVideos.defaultProps = {
  videos: [],
};

