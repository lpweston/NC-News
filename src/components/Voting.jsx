import React, { Component } from "react";
import { patchComments, patchArticle } from "../utils/api";
import ErrorHandler from "./ErrorHandler";

class Voting extends Component {
  state = {
    votes: this.props.votes,
    err: null,
    change: 0
  };
  render() {
    const { votes, err, change } = this.state;
    return (
      <>
        Votes: {votes}{" "}
        <button
          disabled={change >= 1}
          onClick={() => {
            this.incComment(1);
          }}
        >
          <b>&and;</b>
        </button>
        <button
          disabled={change <= -1}
          onClick={() => {
            this.incComment(-1);
          }}
        >
          <b>&or;</b>
        </button>
        {err && <ErrorHandler {...err} />}
      </>
    );
  }
  incComment = inc => {
    const { comment_id, article_id } = this.props;
    this.setState(({ change, votes }) => {
      return { change: change + inc, votes: votes + inc };
    });
    if (comment_id) {
      patchComments(comment_id, inc).catch(() => {
        this.setState(({ votes, change }) => {
          return {
            err: {
              status: 500,
              msg: "Request could not be processed at this time"
            },
            votes: votes - inc,
            change: change - inc
          };
        });
      });
    }
    if (article_id) {
      patchArticle(article_id, inc).catch(() => {
        this.setState(({ votes, change }) => {
          return {
            err: {
              status: 500,
              msg: "Request could not be processed at this time"
            },
            votes: votes - inc,
            change: change - inc
          };
        });
      });
    }
  };
}

export default Voting;
