/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { red, white } from 'styles/color';

const VideoListItemContainer = styled(Link)`
  /* flex: 1; */
  /* display: flex; */
  display: flex;
  flex-direction: column;
  margin: 1rem;
  width: 240px;
  /* max-width: 240px; */
  height: 200px;
  border-radius: 10px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    min-width: 240px;
    /* height: 300px; */
  }
`;

const Thumbnail = styled.div`
  border-radius: 10px 10px 0 0;
  flex: 3;
  display: flex;
  font-weight: 800;
  justify-content: center;
  align-items: center;
`;
const Info = styled.div`
  border-radius: 0 0 10px 10px;
  flex: 1;
  padding: 1rem;
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