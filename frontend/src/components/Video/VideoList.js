import React from 'react';
import styled from 'styled-components';
import VideoListItem from './VideoListItem';

const VideoListContainer = styled.div`
  /* flex: 1; */
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  @media screen and (max-width: 992px) {
    justify-content: center;
  }
`;

function VideoList() {
  return (
    <VideoListContainer>
      {[1,2,3,4,5,6,7,8, 9].map((e, i) => <VideoListItem videos={i}/>)}
    </VideoListContainer>
  )
}

export default VideoList;
