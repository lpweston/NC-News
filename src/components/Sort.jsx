import React from "react";
import MakeButtons from "./MakeButtons";

const Sort = ({ sortItems, item }) => {
  return (
    <ul>
      <li>Date {MakeButtons("created_at", sortItems)}</li>
      <li>Popularity {MakeButtons("votes", sortItems)}</li>
      {item === "articles" && (
        <li>Comments {MakeButtons("comment_count", sortItems)}</li>
      )}
      {item === "articles" && <li>Title {MakeButtons("title", sortItems)}</li>}
      <li>Author {MakeButtons("author", sortItems)}</li>
    </ul>
  );
};

export default Sort;
