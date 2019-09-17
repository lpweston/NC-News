import React from "react";
import { getTopics } from "../utils/api";
import { Link } from "@reach/router";

class TopicList extends React.Component {
  state = {
    topics: [],
    isLoading: true
  };
  render() {
    const { topics, isLoading } = this.state;
    return isLoading ? (
      <p>Loading...</p>
    ) : (
      <ul>
        <li key="All">
          <Link to={"/"}>All Articles</Link>
        </li>
        {topics.map(topic => {
          return (
            <li key={topic.slug}>
              <Link to={`/topics/${topic.slug}`}>
                {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }

  componentDidMount = () => {
    getTopics().then(topics => {
      this.setState({ topics, isLoading: false });
    });
  };
}

export default TopicList;
