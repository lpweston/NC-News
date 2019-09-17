import React, { Component } from "react";
import { postUser } from "../utils/api";
import ErrorHandler from "./ErrorHandler";

class AddUser extends Component {
  state = {
    username: "",
    name: "",
    avatar: "",
    err: null
  };
  render() {
    const { username, name, avatar, err } = this.state;
    if (err) {
      return <ErrorHandler err={err} />;
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add a new user</h2>
        <label>
          Username: *
          <input
            name="username"
            onChange={this.handleUpdate}
            value={username}
          ></input>{" "}
          Must be unique
        </label>
        <br />
        <label>
          Name: *
          <input name="name" onChange={this.handleUpdate} value={name}></input>
        </label>
        <br />
        <label>
          Avatar URL:{" "}
          <input
            name="avatar"
            onChange={this.handleUpdate}
            value={avatar}
          ></input>{" "}
          Enter a valid url
        </label>
        <br />* required
        <br />
        <button>Submit</button>
      </form>
    );
  }
  handleUpdate = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, name, avatar } = this.state;
    postUser(username, name, avatar)
      .then(user => {
        this.setState({ username: "", name: "", avatar: 2 });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
}

export default AddUser;
