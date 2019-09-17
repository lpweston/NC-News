import React from "react";

const CommentItem = ({ comment }) => {
  return <li key={comment.comment_id}>{comment.body}</li>;
};

export default CommentItem;
