import React, { Component } from "react";
import { postUser } from "../utils/api";
import ErrorHandler from "./ErrorHandler";
import User from "./User";
import SideBar from "./SideBar";

class AddUser extends Component {
  state = {
    username: "",
    name: "",
    avatar: "",
    err: null,
    newUser: null
  };
  render() {
    const { username, name, avatar, err, newUser } = this.state;
    if (newUser) return <User user={newUser.username} />;
    return (
      <>
        <SideBar />
        <section>
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
              <input
                name="name"
                onChange={this.handleUpdate}
                value={name}
              ></input>
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
            {err && <ErrorHandler {...err} />}
          </form>
        </section>
      </>
    );
  }
  handleUpdate = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, name, avatar } = this.state;
    if (username.length > 0 && name.length > 0) {
      postUser(username, name, avatar)
        .then(newUser => {
          this.setState({ username: "", name: "", avatar: "", newUser });
        })
        .catch(({ response }) => {
          const { status } = response;
          const { msg } = response.data;
          this.setState({ err: { status, msg }, isLoading: false });
        });
    }
  };
}

export default AddUser;
