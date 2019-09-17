import React, { Component } from "react";
import { getComments } from "../utils/api";
import CommentItem from "./CommentItem";

class CommentList extends Component {
  state = { comments: [] };
  render() {
    const { comments } = this.state;
    return (
      <ul>
        {comments.map(comment => {
          return <CommentItem comment={comment} />;
        })}
      </ul>
    );
  }
  componentDidMount = () => {
    getComments(this.props.article_id).then(comments => {
      this.setState({ comments, isLoading: false });
    });
  };
}

export default CommentList;
