import React, { Component } from "react";
import { getArticle } from "../utils/api";
import { Link } from "@reach/router";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import SideBar from "./SideBar";
import ErrorHandler from "./ErrorHandler";
import { patchArticle } from "../utils/api";
import Loading from "./Loading";
import { deleteArticle } from "../utils/api";
import Voting from "./Voting";

class Article extends Component {
  state = {
    article: null,
    isLoading: true,
    err: null,
    deleted: false
  };
  render() {
    const { article, isLoading, err, deleted } = this.state;
    const { currentUser } = this.props;
    if (err) return <ErrorHandler {...err} />;
    if (isLoading) return <Loading />;
    if (deleted) {
      return (
        <div className="Article">
          <SideBar />
          <section className="Article-section">
            <p>Deleted article</p>
          </section>
        </div>
      );
    }
    const {
      title,
      author,
      created_at,
      votes,
      comment_count,
      article_id
    } = article;
    const date = new Date(created_at);
    return (
      <div className="Article">
        <SideBar />
        <section className="Article-section">
          <h2>{title}</h2>
          <h3>
            <Link to={`/users/${author}`}>{author}</Link>
          </h3>
          <p>{date.toDateString() + " " + date.toTimeString()} </p>
          <p>{article.body}</p>
          {currentUser === author && (
            <button onClick={this.removeArticle}>Delete</button>
          )}
          <p>Comments: {comment_count} </p>
          <Voting votes={votes} article_id={article_id} />
          <h3>Comments:</h3>
          <NewComment
            currentUser={this.props.currentUser}
            article_id={article_id}
          />
          <CommentList
            article_id={article.article_id}
            currentUser={this.props.currentUser}
          />
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
  removeArticle = () => {
    deleteArticle(this.state.article.article_id)
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

export default Article;
