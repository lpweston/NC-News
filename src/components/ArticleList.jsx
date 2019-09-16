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
    this.callApi();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.topic !== this.props.topic) {
      this.callApi();
    }
  };

  callApi = () => {
    getArticles(this.props).then(articles => {
      this.setState({ articles });
    });
  };
}

export default ArticleList;
