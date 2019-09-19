import React from "react";
import TopicList from "./TopicList";
import "../styles/panels.css";
import MakeButtons from "./MakeButtons";

const SideBar = ({ sortItems, item }) => {
  return (
    <div className="sidebar">
      <h3>
        <b>&lt;</b> Topics <b>/&gt;</b>
      </h3>
      <TopicList />
      <div className="seperator" />
      <h3>
        <b>&lt;</b> Sort <b>/&gt;</b>
      </h3>
      <ul>
        <li>Date {MakeButtons("created_at", sortItems)}</li>
        <li>Popularity {MakeButtons("votes", sortItems)}</li>
        {item === "articles" && (
          <li>Comments {MakeButtons("comment_count", sortItems)}</li>
        )}
        {item === "articles" && (
          <li>Title {MakeButtons("title", sortItems)}</li>
        )}
        <li>Author {MakeButtons("author", sortItems)}</li>
      </ul>
    </div>
  );
};

export default SideBar;
