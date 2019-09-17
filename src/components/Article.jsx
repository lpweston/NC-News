import React, { Component } from "react";
import { getArticle } from "../utils/api";
import { Link } from "@reach/router";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import SideBar from "./SideBar";

class Article extends Component {
  state = {
    article: null,
    isLoading: true
  };
  render() {
    const { article, isLoading } = this.state;
    return isLoading ? (
      <p>loading ...</p>
    ) : (
      <div className="Article">
        <SideBar />
        <section>
          <h2>{article.title}</h2>
          <h3>
            <Link to={`/users/${article.author}`}>{article.author}</Link>
          </h3>
          <p>Created: {article.created_at} </p>
          <p>
            Votes: {article.votes} &middot; Comments: {article.comment_count}
          </p>
          <p>{article.body}</p>
          <h3>Comments:</h3>
          <NewComment />
          <CommentList article_id={article.article_id} />
        </section>
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
