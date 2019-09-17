import React, { Component } from "react";
import { getArticle } from "../utils/api";
import { Link } from "@reach/router";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import SideBar from "./SideBar";
import ErrorHandler from "./ErrorHandler";
import { patchArticle } from "../utils/api";
import Loading from "./Loading";

class Article extends Component {
  state = {
    article: null,
    isLoading: true,
    err: null
  };
  render() {
    const { article, isLoading, err } = this.state;
    if (err) {
      return <ErrorHandler err={err} />;
    }
    if (isLoading) {
      return <Loading />;
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
          <p>{article.body}</p>
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
          <h3>Comments:</h3>
          <NewComment />
          <CommentList article_id={article.article_id} />
        </section>
      </div>
    );
  }
  componentDidMount = () => {
    const { article } = this.props;
    getArticle(article)
      .then(article => {
        this.setState({ article, isLoading: false });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
  incArticle = (article_id, inc) => {
    patchArticle(article_id, inc)
      .then(article => {
        this.setState({ article });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
}

export default Article;
