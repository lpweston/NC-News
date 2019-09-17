import React, { Component } from "react";
import ArticleList from "./ArticleList";
import SideBar from "./SideBar";
import { getTopics } from "../utils/api";
import ErrorHandler from "./ErrorHandler";

class Topic extends Component {
  state = {
    topic: this.props.topic,
    description: "",
    sort_by: undefined,
    order: undefined,
    err: null
  };
  render() {
    const { topic, description, sort_by, order, err } = this.state;
    if (err) return <ErrorHandler {...err} />;
    return (
      <div id="Topic">
        <SideBar sortArticles={this.sortArticles} />
        <section>
          <h2>{topic[0].toUpperCase() + topic.slice(1)}</h2>
          <p>{description}</p>
          <ArticleList topic={topic} sort_by={sort_by} order={order} />
        </section>
      </div>
    );
  }

  sortArticles = e => {
    const pair = e.target.value.split(" ");
    this.setState({ sort_by: pair[0], order: pair[1] });
  };

  componentDidMount = () => {
    this.fetchTopics();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.topic !== this.props.topic) {
      this.fetchTopics();
    }
  };

  fetchTopics = () => {
    getTopics(this.props.topic)
      .then(topic => {
        this.setState({
          topic: this.props.topic,
          description: topic.description
        });
      })
      .catch(({ responce }) => {
        const { status } = responce;
        const { msg } = responce.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
}

export default Topic;
