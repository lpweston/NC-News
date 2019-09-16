import React, { Component } from "react";
import { getArticle } from "../utils/api";
import { Link } from "@reach/router";
import NewComment from "./NewComment";
import CommentList from "./CommentList";

class Article extends Component {
  state = {
    article: null,
    isLoading: true
  };
  render() {
    const { article, isLoading } = this.state;
    return isLoading ? (
      "loading..."
    ) : (
      <div>
        <h2>{article.title}</h2>
        <h3>
          <Link to={`/users/${article.author}`}>{article.author}</Link>
        </h3>
        <p>Created: {article.created_at} </p>
        <p>
          Votes: {article.votes} &middot; Comments: {article.comment_count}
        </p>
        <p>{article.body}</p>
        <NewComment />
        <CommentList />
      </div>
    );
  }
  componentDidMount = () => {
    const { article } = this.props;
    getArticle(article).then(article => {
      this.setState({ article, isLoading: false });
    });
  };
}

export default Article;
