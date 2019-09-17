import React, { Component } from "react";
import ArticleList from "./ArticleList";
import SideBar from "./SideBar";

class Home extends Component {
  state = {
    sort: null
  };
  render() {
    const { sort } = this.state;
    return (
      <div id="Home">
        <SideBar sortArticles={this.sortArticles} clearSort={this.clearSort} />
        <section>
          <h2>Articles</h2>
          {sort && (
            <p>
              Sorted by: {sort.sort_by} {sort.order}
            </p>
          )}
          <ArticleList sort={sort} />
        </section>
      </div>
    );
  }

  sortArticles = e => {
    const sort = e.target.value.split(" ");
    const newSort = { sort_by: sort[0], order: sort[1] };
    this.setState({ sort: newSort });
  };

  clearSort = e => {
    console.log("clear");
  };
}

export default Home;
