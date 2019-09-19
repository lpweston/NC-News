import React from "react";
import TopicList from "./TopicList";
import "../styles/panels.css";
const makeButtons = (sortParam, sortArticles) => {
  return (
    <>
      <button value={sortParam + " asc"} onClick={sortArticles}>
        &and;
      </button>
      <button value={sortParam + " desc"} onClick={sortArticles}>
        &or;
      </button>
    </>
  );
};
const SideBar = ({ sortArticles }) => {
  return (
    <div className="sidebar">
      <h3>
        <b>&lt;</b> Topics <b>/&gt;</b>
      </h3>
      <TopicList />
      <hr />
      <h3>
        <b>&lt;</b> Sort <b>/&gt;</b>
      </h3>
      <li>Date {makeButtons("created_at", sortArticles)}</li>
      <li>Popularity {makeButtons("votes", sortArticles)}</li>
      <li>Comments {makeButtons("comment_count", sortArticles)}</li>
      <li>Title {makeButtons("title", sortArticles)}</li>
      <li>Author {makeButtons("author", sortArticles)}</li>
    </div>
  );
};

export default SideBar;
