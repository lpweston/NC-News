import React, { Component } from "react";
import { getArticle } from "../utils/api";
import { Link } from "@reach/router";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import SideBar from "./SideBar";
import { patchArticle } from "../utils/api";

class Article extends Component {
  state = {
    article: null,
    isLoading: true
  };
  render() {
    const { article, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    const {
      title,
      author,
      created_at,
      votes,
      comment_count,
      article_id
    } = article;
    return (
      <div className="Article">
        <SideBar />
        <section className="Article-section">
          <h2>{title}</h2>
          <h3>
            <Link to={`/users/${author}`}>{author}</Link>
          </h3>
          <p>Created: {created_at} </p>
          <p>
            Comments: {comment_count} &middot; Votes: {votes}{" "}
            <button
              onClick={() => {
                this.incArticle(article_id, 1);
              }}
            >
              ^
            </button>
            <button
              onClick={() => {
                this.incArticle(article_id, -1);
              }}
            >
              v
            </button>
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
  incArticle = (article_id, inc) => {
    patchArticle(article_id, inc).then(article => {
      this.setState({ article });
    });
  };
}

export default Article;
