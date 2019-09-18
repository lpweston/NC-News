import React, { Component } from "react";
import { Link } from "@reach/router";
import { getArticle, patchArticle, deleteArticle, getUser } from "../utils/api";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import SideBar from "./SideBar";
import ErrorHandler from "./ErrorHandler";
import Loading from "./Loading";
import Voting from "./Voting";

class Article extends Component {
  state = {
    article: null,
    isLoading: true,
    err: null,
    deleted: false,
    avatar_url: ""
  };
  render() {
    const { article, isLoading, err, deleted, avatar_url } = this.state;
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
      <main className="Article">
        <SideBar />
        <section className="Article-section">
          <h2>{title}</h2>
          <h3>
            <img src={avatar_url} width="50px" height="50px" alt="avatar" />
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
      </main>
    );
  }
  componentDidMount = () => {
    const { article } = this.props;
    getArticle(article)
      .then(article => {
        this.setState({ article, isLoading: false });
      })
      .then(() => {
        getUser(this.state.article.author).then(user => {
          this.setState({ avatar_url: user.avatar_url });
        });
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
