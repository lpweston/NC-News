import React, { Component } from "react";
import ArticleList from "./ArticleList";
import SideBar from "./SideBar";
import { getTopics } from "../utils/api";

class Topic extends Component {
  state = { topic: this.props.topic, description: "" };
  render() {
    const { topic, description } = this.state;
    return (
      <div id="Topic">
        <SideBar />
        <section>
          <h2>{topic[0].toUpperCase() + topic.slice(1)}</h2>
          <p>{description}</p>
          <ArticleList topic={topic} />
        </section>
      </div>
    );
  }

  componentDidMount = () => {
    this.callApi();
  };

  componentDidUpdate = prevProps => {
    if (prevProps.topic !== this.props.topic) {
      this.callApi();
    }
  };

  callApi = () => {
    getTopics(this.props.topic)
      .then(topic => {
        this.setState({
          topic: this.props.topic,
          description: topic.description
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export default Topic;
