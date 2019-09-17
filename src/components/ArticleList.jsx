import React, { Component } from "react";
import { getArticles } from "../utils/api";
import ArticleItem from "./ArticleItem";
import ErrorHandler from "./ErrorHandler";
import Loading from "./Loading";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true,
    err: null
  };
  render() {
    const { articles, isLoading, err } = this.state;
    if (err) return <ErrorHandler err={err} />;
    return isLoading ? (
      <Loading />
    ) : (
      <ul className="articlelist">
        {articles.map(article => {
          return <ArticleItem article={article} key={article.article_id} />;
        })}
      </ul>
    );
  }

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = prevProps => {
    for (const key in prevProps) {
      if (prevProps[key] !== this.props[key]) {
        this.fetchArticles();
      }
    }
  };

  fetchArticles = () => {
    getArticles(this.props)
      .then(articles => {
        this.setState({ articles, isLoading: false });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
}

export default ArticleList;
