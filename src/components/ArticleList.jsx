import React, { Component } from "react";
import { getArticles } from "../utils/api";
import ArticleItem from "./ArticleItem";
import ErrorHandler from "./ErrorHandler";
import Loading from "./Loading";
import Pages from "./Pages";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    err: null,
    page: 1,
    totalPages: undefined,
    limit: 10
  };
  render() {
    const { articles, isLoading, err, page, totalPages } = this.state;
    if (err) return <ErrorHandler {...err} />;
    return isLoading ? (
      <Loading />
    ) : (
      <ul className="articlelist">
        <Pages
          page={page}
          totalPages={totalPages}
          changePage={this.changePage}
        />
        {articles.map(article => {
          return <ArticleItem article={article} key={article.article_id} />;
        })}
        <Pages
          page={page}
          totalPages={totalPages}
          changePage={this.changePage}
        />
      </ul>
    );
  }

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.page !== this.state.page) {
      this.fetchArticles();
    }
    for (const key in prevProps) {
      if (prevProps[key] !== this.props[key]) {
        this.fetchArticles();
      }
    }
  };

  fetchArticles = () => {
    const { page, limit } = this.state;
    getArticles({ ...this.props, p: page, limit: limit })
      .then(({ articles, total_count }) => {
        const totalPages = Math.ceil(total_count / limit);
        this.setState({ articles, isLoading: false, totalPages });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
  changePage = inc => {
    this.setState(({ page }) => {
      return { page: page + inc };
    });
  };
}

export default ArticleList;
