import React, { Component } from "react";
import { getComments } from "../utils/api";
import CommentItem from "./CommentItem";
import ErrorHandler from "./ErrorHandler";
import Loading from "./Loading";
import Pages from "./Pages";
import NewComment from "./NewComment";

class CommentList extends Component {
  state = {
    comments: [],
    isLoading: true,
    err: null,
    p: 1,
    totalPages: undefined,
    limit: 10
  };
  render() {
    const { comments, isLoading, err, p, totalPages, limit } = this.state;
    const { article_id, currentUser } = this.props;
    if (err) return <ErrorHandler {...err} />;
    if (isLoading) return <Loading />;
    return (
      <>
        <Pages
          page={p}
          totalPages={totalPages}
          changePage={this.changePage}
          limit={limit}
          changeLimit={this.changeLimit}
        />
        <ul>
          <NewComment currentUser={currentUser} article_id={article_id} />
          {comments.map(comment => {
            return (
              <CommentItem
                comment={comment}
                key={comment.comment_id}
                currentUser={currentUser}
                article_id={article_id}
              />
            );
          })}
        </ul>
        <Pages
          page={p}
          totalPages={totalPages}
          changePage={this.changePage}
          limit={limit}
          changeLimit={this.changeLimit}
        />
      </>
    );
  }
  componentDidMount = () => {
    this.fetchComments();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { p, limit } = this.state;
    const { sort_by, order } = this.props;
    if (
      prevState.p !== p ||
      prevState.limit !== limit ||
      prevProps.sort_by !== sort_by ||
      prevProps.order !== order
    ) {
      this.fetchComments();
    }
  };

  fetchComments = () => {
    const { article_id, order, sort_by } = this.props;
    const { limit, p } = this.state;
    getComments(article_id, sort_by, order, limit, p)
      .then(({ comments, total_count }) => {
        this.setState({
          comments,
          isLoading: false,
          totalPages: Math.ceil(total_count / limit)
        });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };

  changePage = inc => {
    this.setState(({ p }) => {
      return { p: p + inc };
    });
  };
  changeLimit = e => {
    const limit = e.target.value;
    this.setState({ limit, p: 1 });
  };
}

export default CommentList;
