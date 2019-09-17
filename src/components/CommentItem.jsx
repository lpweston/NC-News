import React, { Component } from "react";
import { Link } from "@reach/router";
import { patchComments } from "../utils/api";
import ErrorHandler from "./ErrorHandler";

class CommentItem extends Component {
  state = { comment: this.props.comment, err: null };
  render() {
    const {
      comment_id,
      author,
      created_at,
      body,
      votes,
      err
    } = this.state.comment;
    if (err) {
      return <ErrorHandler err={err} />;
    }
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
}

export default CommentItem;
