import React, { Component } from "react";

class NewComment extends Component {
  render() {
    return (
      <form onSubmit={this.postComment}>
        <input placeholder="Post new comment" />
        <button>Submit</button>
      </form>
    );
  }
  postComment = () => {};
}

export default NewComment;
