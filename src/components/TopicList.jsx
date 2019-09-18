import React from "react";
import { getTopics } from "../utils/api";
import { Link } from "@reach/router";
import Loading from "./Loading";
import ErrorHandler from "./ErrorHandler";

class TopicList extends React.Component {
  state = {
    topics: [],
    isLoading: true,
    err: null
  };
  render() {
    const { topics, isLoading, err } = this.state;
    if (isLoading) return <Loading />;
    if (err) return <ErrorHandler {...err} />;
    return (
      <>
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
      </>
    );
  }

  componentDidMount = () => {
    getTopics()
      .then(topics => {
        this.setState({ topics, isLoading: false });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
}

export default TopicList;
