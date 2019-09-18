import React from "react";
import TopicList from "./TopicList";
import "../styles/header.css";

const makeButtons = (sortParam, sortArticles) => {
  return (
    <>
      <button value={sortParam + " asc"} onClick={sortArticles}>
        ^
      </button>
      <button value={sortParam + " desc"} onClick={sortArticles}>
        v
      </button>
    </>
  );
};
const SideBar = ({ sortArticles }) => {
  return (
    <div className="sidebar">
      <h3>Topics</h3>
      <TopicList />
      <h3>Sort</h3>
      <li>Date {makeButtons("created_at", sortArticles)}</li>
      <li>Popularity {makeButtons("votes", sortArticles)}</li>
      <li>Comments {makeButtons("comment_count", sortArticles)}</li>
      <li>Title {makeButtons("title", sortArticles)}</li>
      <li>Author {makeButtons("author", sortArticles)}</li>
    </div>
  );
};

export default SideBar;
