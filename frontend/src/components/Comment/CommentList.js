/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'components/common';

const CommentListContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const CommentListContents = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Comment = styled.div`
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  opacity: 0.7;
  background-color: lightgreen;
`;

const UserInfo = styled.div`
  margin-right: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    padding: 2px;
    margin-left: 1rem;
    border: none;
    background-color: white;
    &:hover {
      background-color: red;
      color: white;
    }
  }
`;

function CommentList({ comments, handleDeleteComment, userId }) {
  
  return (
    <CommentListContainer>
      {comments.length ? (
        <>
          {comments.map((comment) => (
              <CommentListContents key={comment._id}>
                <Comment>{comment.text}</Comment>
                <UserInfo>
                  <Avatar>{comment.owner[0]}</Avatar>
                  {(userId === comment.owner) && <button type="button" onClick={() => handleDeleteComment(comment._id)}>X</button>}
                </UserInfo>
              </CommentListContents>
            ))}
        </>
      ) : (
        <div style={{ height: '1rem' }}>댓글이 없습니다</div>
      )}
    </CommentListContainer>
  )
}

export default CommentList;

CommentList.propTypes = {
  comments:  PropTypes.oneOfType([
    () => null,
    PropTypes.array
  ]).isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

CommentList.defaultProps = {
  userId: '',
}


