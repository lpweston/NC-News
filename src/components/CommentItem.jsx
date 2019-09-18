import React, { Component } from "react";
import { Link } from "@reach/router";
import ErrorHandler from "./ErrorHandler";
import { deleteComment } from "../utils/api";
import Voting from "./Voting";

class CommentItem extends Component {
  state = { comment: this.props.comment, err: null, deleted: false };
  render() {
    const { comment_id, author, created_at, body, votes } = this.state.comment;
    const { err, deleted } = this.state;
    const { currentUser } = this.props;
    if (deleted) return <li className="CommentItem">Comment deleted</li>;
    const date = new Date(created_at);
    return (
      <li className="CommentItem">
        {<Link to={`/users/${author}`}>{author}</Link>} <br />
        {date.toDateString() + " " + date.toTimeString()}
        <br />
        <br />
        {body}
        <br />
        <br />
        <Voting votes={votes} comment_id={comment_id} />
        <br />
        {currentUser === author && (
          <button onClick={this.removeComment}>Delete</button>
        )}
        {err && <ErrorHandler {...err} />}
      </li>
    );
  }

  removeComment = () => {
    deleteComment(this.state.comment.comment_id)
      .then(() => {
        this.setState({ deleted: true });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg } });
      });
  };
}

export default CommentItem;
