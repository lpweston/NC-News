import React, { Component } from "react";
import ArticleList from "./ArticleList";
import SideBar from "./SideBar";
import { getTopics } from "../utils/api";
import ErrorHandler from "./ErrorHandler";
import Loading from "./Loading";

class Topic extends Component {
  state = {
    topic: this.props.topic,
    description: "",
    sort_by: undefined,
    order: undefined,
    err: null,
    isLoading: true
  };
  render() {
    const { topic, description, sort_by, order, err, isLoading } = this.state;
    if (err) return <ErrorHandler {...err} />;
    if (isLoading) return <Loading />;
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
          description: topic.description,
          isLoading: false
        });
      })
      .catch(err => {
        let status, msg;
        if (err.status) {
          status = err.status;
          msg = err.msg;
        } else {
          status = err.response.status;
          msg = err.response.data.msg;
        }
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
}

export default Topic;
