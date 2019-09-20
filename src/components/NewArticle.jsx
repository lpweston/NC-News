import React, { Component } from "react";
import { getTopics, postArticle } from "../utils/api";
import SideBar from "./SideBar";
import Article from "./Article";
import ErrorHandler from "./ErrorHandler";

class NewArticle extends Component {
  state = {
    title: "",
    body: "",
    selTopic: "coding",
    topics: [],
    err: null,
    article_id: undefined
  };
  render() {
    const { title, body, selTopic, topics, article_id, err } = this.state;

    if (article_id) {
      return (
        <Article article={article_id} currentUser={this.props.currentUser} />
      );
    }
    if (err) {
      return <ErrorHandler {...err} />;
    }
    return (
      <>
        <SideBar />
        <section>
          <form onSubmit={this.handleSubmit}>
            <label>
              Title:{" "}
              <input
                value={title}
                name="title"
                onChange={this.handleUpdate}
              ></input>
            </label>
            <br />
            <br />
            <label>
              Topic:{" "}
              <select
                value={selTopic}
                onChange={this.handleUpdate}
                name="selTopic"
              >
                {topics.map(topic => {
                  return (
                    <option value={topic.slug} key={topic.slug}>
                      {topic.slug}
                    </option>
                  );
                })}
              </select>
            </label>
            <br />
            <br />
            <label>
              Body:{" "}
              <textarea
                value={body}
                name="body"
                onChange={this.handleUpdate}
                row="10"
                cols="50"
              />
            </label>
            <br />
            <br />
            <button>Submit</button>
          </form>
        </section>
      </>
    );
  }

  componentDidMount = () => {
    getTopics()
      .then(topics => {
        this.setState({ topics, selTopic: topics[0].slug });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };

  handleUpdate = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { title, selTopic, body } = this.state;
    const { currentUser } = this.props;
    postArticle({ title, topic: selTopic, body, username: currentUser })
      .then(({ article_id }) => {
        this.setState({ article_id });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
}

export default NewArticle;
