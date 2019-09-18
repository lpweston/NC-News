import React, { Component } from "react";
import { Link } from "@reach/router";
import { patchComments } from "../utils/api";
import ErrorHandler from "./ErrorHandler";
import { deleteComment } from "../utils/api";

class CommentItem extends Component {
  state = { comment: this.props.comment, err: null, deleted: false };
  render() {
    const { comment_id, author, created_at, body, votes } = this.state.comment;
    const { err, deleted } = this.state;
    const { currentUser } = this.props;
    if (err) return <ErrorHandler err={err} />;
    if (deleted) return <li className="CommentItem">Comment deleted</li>;
    return (
      <li className="CommentItem">
        {<Link to={`/users/${author}`}>{author}</Link>} &middot; {created_at}{" "}
        <br />
        {body}
        <br />
        Votes: {votes}{" "}
        <button
          onClick={() => {
            this.incComment(comment_id, 1);
          }}
        >
          ^
        </button>
        <button
          onClick={() => {
            this.incComment(comment_id, -1);
          }}
        >
          v
        </button>
        <br />
        {currentUser === author && (
          <button onClick={this.removeComment}>Delete</button>
        )}
      </li>
    );
  }
  incComment = (comment_id, inc) => {
    patchComments(comment_id, inc).then(comment => {
      this.setState({ comment })
        .catch(({ response }) => {
          const { status } = response;
          const { msg } = response.data;
          this.setState({ err: { status, msg } });
        })
        .catch(({ response }) => {
          const { status } = response;
          const { msg } = response.data;
          this.setState({ err: { status, msg } });
        });
    });
  };

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
