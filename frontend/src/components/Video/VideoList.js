/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoListItem from './VideoListItem';

const VideoListContainer = styled.div`
  flex: 1;
  height: 80vh;
  display: flex;;
  flex-wrap: wrap;
  align-items: ${({ center }) => (center ? 'center' : '')};
  @media screen and (max-width: 992px) {
    /* align-items: center; */
  }
`;

function VideoList({ videos }) {
  if (!videos.length) return <VideoListContainer center>비디오가 없습니다</VideoListContainer>
  return (
    <VideoListContainer>
      {videos.map((video) => <VideoListItem key={video._id} video={video} />)}
    </VideoListContainer>
  )
}

export default VideoList;

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object),
}

VideoList.defaultProps = {
  videos: [],
};
