import React, { Component } from "react";
import ArticleList from "./ArticleList";
import SideBar from "./SideBar";

class Home extends Component {
  state = {
    sort_by: undefined,
    order: undefined
  };
  render() {
    const { sort_by, order } = this.state;
    return (
      <div id="Home">
        <SideBar sortArticles={this.sortArticles} />
        <section>
          <h2>Articles</h2>
          {sort_by && (
            <p>
              Sorted by: {sort_by} {order}
            </p>
          )}
          <ArticleList sort_by={sort_by} order={order} />
        </section>
      </div>
    );
  }
  sortArticles = e => {
    const pair = e.target.value.split(" ");
    this.setState({ sort_by: pair[0], order: pair[1] });
  };
}

export default Home;
