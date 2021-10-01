import React from 'react';
import styled from 'styled-components';

const VideoListItemContainer = styled.div`
  /* flex: 1; */
  display: flex;
  padding: 1rem;
  margin: 1rem;
  min-width: 240px;
  height: 200px;
  background-color: red;
  border-radius: 10px;
  @media screen and (max-width: 992px) {
    
    width: 300px;
    height: 200px;
  }
  @media screen and (max-width: 768px) {
    background-color: yellow;
    min-width: 100%;
    height: 300px;
  }
`;

function VideoListItem() {
  return (
    <VideoListItemContainer>
      1
    </VideoListItemContainer>
  )
}

export default VideoListItem;
