import React, { Component } from "react";
import { getComments } from "../utils/api";
import CommentItem from "./CommentItem";
import ErrorHandler from "./ErrorHandler";
import Loading from "./Loading";

class CommentList extends Component {
  state = { comments: [], isLoading: true, err: null };
  render() {
    const { comments, isLoading, err } = this.state;
    if (err) return <ErrorHandler err={err} />;
    if (isLoading) return <Loading />;
    return (
      <ul>
        {comments.map(comment => {
          return (
            <CommentItem
              comment={comment}
              key={comment.comment_id}
              currentUser={this.props.currentUser}
            />
          );
        })}
      </ul>
    );
  }
  componentDidMount = () => {
    getComments(this.props.article_id)
      .then(comments => {
        this.setState({ comments, isLoading: false });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
}

export default CommentList;
