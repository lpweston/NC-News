import React, { Component } from "react";
import { postComment } from "../utils/api";
import ErrorHandler from "./ErrorHandler";
import CommentItem from "./CommentItem";

class NewComment extends Component {
  state = {
    currentUser: this.props.currentUser,
    body: "",
    err: null,
    comment: false
  };
  render() {
    const { err, comment, currentUser } = this.state;
    if (err) return <ErrorHandler {...err} />;
    if (comment)
      return <CommentItem comment={comment} currentUser={currentUser} />;
    return (
      <form onSubmit={this.sendComment}>
        <input
          placeholder="Post new comment"
          value={this.state.body}
          onChange={this.handleClick}
        />
        <button>Submit</button>
      </form>
    );
  }

  componentDidUpdate = prevProps => {
    if (prevProps.currentUser !== this.props.currentUser) {
      this.setState({ currentUser: this.props.currentUser });
    }
  };

  handleClick = e => {
    this.setState({ body: e.target.value });
  };

  sendComment = e => {
    e.preventDefault();
    const { currentUser, body } = this.state;
    const { article_id } = this.props;
    postComment(article_id, currentUser, body)
      .then(comment => {
        this.setState({ comment });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg } });
      });
  };
}

export default NewComment;
