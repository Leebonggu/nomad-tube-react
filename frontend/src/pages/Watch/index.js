import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Watch() {
  const { id } = useParams();
  console.log(123, id);
  useEffect(() => {
    axios.get(`/apis/videos/${id}`)
      .then(d => console.log(d))
      .catch(e => console.log(e));
  }, [id])
  return (
    <div>
      Watch
    </div>
  )
}

export default Watch;
