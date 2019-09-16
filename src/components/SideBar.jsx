import React from "react";
import TopicList from "./TopicList";

const SideBar = () => {
  return (
    <div id="sidebar">
      <h3>Topics</h3>
      <TopicList />
      <h3>Sort</h3>
      <ul>
        <li>newest</li> <li>popular</li>
      </ul>
      <input></input>
      <button>Search</button>
    </div>
  );
};

export default SideBar;
