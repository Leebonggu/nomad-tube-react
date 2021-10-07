import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from 'common/form';
import { Button } from 'components/common';

const CommentFormContainer = styled.form`
  flex: 1;
  display: flex;
  input {
    flex: 5;
    border-radius: 5px;
  }
  button {
    height: 3rem;
    margin-left: 2px;
    flex: 1;
  }
`;

function CommentForm({
  comment,
  handleComment,
  handleSubmitComment,
  userId,
}) {
  return (
    <CommentFormContainer onSubmit={handleSubmitComment}>
      <Input type="text" value={comment} onChange={handleComment} required/>
      <Button type="submit">{userId ? '작성' : '로그인이필요합니다'}</Button>
    </CommentFormContainer>
  );
}

export default CommentForm;

CommentForm.propTypes = {
  comment: PropTypes.string.isRequired,
  handleComment: PropTypes.func.isRequired,
  handleSubmitComment: PropTypes.func.isRequired,
  userId: PropTypes.string,
};

CommentForm.defaultProps = {
  userId: '',
}
