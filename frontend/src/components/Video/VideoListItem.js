/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const VideoListItemContainer = styled(Link)`
  /* flex: 1; */
  /* display: flex; */
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 1rem;
  width: 240px;
  /* max-width: 240px; */
  height: 200px;
  border-radius: 10px;
  border: 1px solid gray;

  @media screen and (max-width: 768px) {
    width: 90%;
    min-width: 240px;
    /* height: 300px; */
  }
`;

const Thumbnail = styled.div`
  flex: 3;
  border-bottom: 1px solid gray;
`;
const Info = styled.div`
  flex: 1;
`;

function VideoListItem({ video }) {
  return (
    <VideoListItemContainer to={`/watch/${video._id}`}>
      <Thumbnail>{video.title}</Thumbnail>
      <Info>{video.description}</Info>
    </VideoListItemContainer>
  )
}

export default VideoListItem;

VideoListItem.propTypes = {
  video: PropTypes.oneOfType([
    () => null,
    PropTypes.object
  ]).isRequired
};