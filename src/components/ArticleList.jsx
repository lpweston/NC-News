import React, { Component } from "react";
import { getArticles } from "../utils/api";
import ArticleItem from "./ArticleItem";

class ArticleList extends Component {
  state = {
    articles: [],
    isLoading: true
  };
  render() {
    const { articles, isLoading } = this.state;
    return isLoading ? (
      <p>loading ...</p>
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
    getArticles(this.props).then(articles => {
      this.setState({ articles, isLoading: false });
    });
  };
}

export default ArticleList;
