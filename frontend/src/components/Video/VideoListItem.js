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
  background-color: pink;
  border-radius: 10px;

  @media screen and (max-width: 768px) {
    background-color: yellow;
    min-width: 100%;
    /* height: 300px; */
  }
`;

const Thumbnail = styled.div`
  flex: 3;
`;
const Info = styled.div`
  flex: 1;
`;

function VideoListItem({ video }) {
  return (
    <VideoListItemContainer to={`/watch/${video._id}`}>
      <Thumbnail>1</Thumbnail>
      <Info>2</Info>
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