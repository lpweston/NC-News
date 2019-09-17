import React, { Component } from "react";
import { Link } from "@reach/router";
import { patchComments } from "../utils/api";

class CommentItem extends Component {
  state = { comment: this.props.comment };
  render() {
    const { comment_id, author, created_at, body, votes } = this.state.comment;
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
      this.setState({ comment });
    });
  };
}

export default CommentItem;
