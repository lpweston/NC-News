import React from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Topic from "./components/Topic";
import Article from "./components/Article";
import NewArticle from "./components/NewArticle";
import Users from "./components/Users";
import User from "./components/User";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Home path="/" />
        <Topic path="/:topic" />
        <Article path="/articles/:article" />
        <NewArticle path="/newarticle" />
        <Users path="/users" />
        <User path="/users/:user" />
      </Router>
    </div>
  );
}

export default App;
