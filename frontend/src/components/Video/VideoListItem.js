/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const VideoListItemContainer = styled(Link)`
  width: 20rem;
  height: 20rem;
  margin: 1rem;
  /* display: flex; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  @media screen and (max-width: 768px) {
    /* padding: 10rem 0; */
    width: 100%;
  }
`;

const Thumbnail = styled.div`
  flex: 3;
  width: 100%;
  padding: 1rem;
  border-radius: 10px 10px 0 0;
  background-color: ${({ color }) => color};
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  &:hover {
    opacity: 0.8;
  }
`;

const Info = styled.div`
  border-radius: 0 0 10px 10px;
  flex: 1;
  padding: 1rem;
  display: flex;
`;

function VideoListItem({ video }) {
  return (
    <VideoListItemContainer  to={`/watch/${video._id}`}> 
      <Thumbnail color={getRandomColor()}>{video.title}</Thumbnail>
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