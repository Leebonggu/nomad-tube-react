/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoListItem from './VideoListItem';

const VideoListContainer = styled.div`
  flex: 1;
  display: flex;;
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (max-width: 992px) {
    /* justify-content: center; */
  }
`;

function VideoList({ videos }) {
  if (!videos.length) return <VideoListContainer>Loading</VideoListContainer>
  return (
    <VideoListContainer>
      {[...videos, ...videos, ...videos].map((video) => <VideoListItem key={video._id} video={video} />)}
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
