import React from "react";
import { Link } from "@reach/router";

const ArticleItem = props => {
  const { article } = props;
  const date = new Date(article.created_at);
  return (
    <li key={article.article_id} className="ArticleItem">
      <Link to={`/articles/${article.article_id}`}>
        <h4>{article.title}</h4>
      </Link>
      <p>
        <Link to={`/users/${article.author}`}>{article.author}</Link> &middot;
        {date.toDateString()}
        <br />
        Votes: {article.votes} &middot; Comments: {article.comment_count}
      </p>
    </li>
  );
};

export default ArticleItem;
