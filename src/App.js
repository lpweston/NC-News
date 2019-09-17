import React, { Component } from "react";
import { Router } from "@reach/router";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Topic from "./components/Topic";
import Article from "./components/Article";
import NewArticle from "./components/NewArticle";
import Users from "./components/Users";
import User from "./components/User";

class App extends Component {
  state = { currentUser: "guest" };
  render() {
    return (
      <div className="App">
        <Header login={this.login} />
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
  login = e => {
    const currentUser = e.target.value;
    this.setState({ currentUser });
  };
}

export default App;
