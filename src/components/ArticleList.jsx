import React, { Component } from "react";
import { Link } from "@reach/router";
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
          return (
            <li key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  componentDidMount = () => {
    this.fetchArticles();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles();
    }
  };

  fetchArticles = () => {
    getArticles(this.props).then(articles => {
      this.setState({ articles });
    });
  };
}

export default ArticleList;
