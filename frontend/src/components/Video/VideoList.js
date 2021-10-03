/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoListItem from './VideoListItem';

const VideoListContainer = styled.div`
  /* flex: 1; */
  flex: 1;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media screen and (max-width: 992px) {
    justify-content: center;
  }
`;

function VideoList({ videos }) {
  if (!videos.length) return <VideoListContainer>Loading</VideoListContainer>
  return (
    <VideoListContainer>
      {videos.map((video) => <VideoListItem key={video._id} video={video} />)}
    </VideoListContainer>
  )
}

export default VideoList;

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
}
