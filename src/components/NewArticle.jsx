import React, { Component } from "react";
import { getTopics } from "../utils/api";

class NewArticle extends Component {
  state = {
    title: "",
    body: "",
    selTopic: "make new topic",
    topics: [],
    err: null
  };
  render() {
    console.log(this.state);
    const { title, body, selTopic, topics } = this.state;
    return (
      <form>
        <label>
          Title:{" "}
          <input
            value={title}
            name="title"
            onChange={this.handleUpdate}
          ></input>
        </label>
        <br />
        <label>
          Topic:
          <select value={selTopic} onChange={this.handleUpdate} name="selTopic">
            {topics.map(topic => {
              return (
                <option value={topic.slug} key={topic.slug}>
                  {topic.slug}
                </option>
              );
            })}
            <option value="make new topic">make new topic</option>
          </select>{" "}
          <label>
            Topic Name:<input disabled={selTopic !== "make new topic"}></input>
          </label>
        </label>
        <br />
        <label>
          Body:{" "}
          <input value={body} name="body" onChange={this.handleUpdate}></input>
        </label>
        <button>Submit</button>
      </form>
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

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const { studentName, startingCohort } = this.state;
  //   sendStudent(studentName, startingCohort).then(student => {
  //     //this.props.updateStudent(student);
  //     this.setState({ studentName: "", startingCohort: "" });
  //   });
  // };
}

export default NewArticle;
