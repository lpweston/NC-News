import React from "react";
import ArticleList from "./ArticleList";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div id="Home">
      <SideBar />
      <ArticleList />
    </div>
  );
};

export default Home;
