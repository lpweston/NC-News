import React from "react";
import { getTopics } from "../utils/api";
import { Link } from "@reach/router";

class TopicList extends React.Component {
  state = {
    topics: []
  };
  render() {
    const { topics } = this.state;
    return (
      <ul>
        {topics.map(topic => {
          return (
            <li key={topic.slug}>
              <Link to={`/${topic.slug}`}>
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
      this.setState({ topics });
    });
  };
}

export default TopicList;
