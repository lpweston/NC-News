import React from "react";
import ArticleList from "./ArticleList";
import SideBar from "./SideBar";

const Home = () => {
  return (
    <div id="Home">
      <SideBar />
      <section>
        <h2>Articles</h2>
        <ArticleList />
      </section>
    </div>
  );
};

export default Home;
