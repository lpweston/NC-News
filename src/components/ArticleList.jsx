import React, { Component } from "react";
import { getArticles } from "../utils/api";

class ArticleList extends Component {
  state = {
    articles: []
  };
  render() {
    const { articles } = this.state;
    return (
      <ul id="articlelist">
        {articles.map(article => {
          return <li key={article.article_id}>{article.title}</li>;
        })}
      </ul>
    );
  }

  componentDidMount = () => {
    getArticles().then(articles => {
      this.setState({ articles });
    });
  };
}

export default ArticleList;
