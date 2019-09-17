import React, { Component } from "react";
import { getUser } from "../utils/api";
import ErrorHandler from "./ErrorHandler";
import Loading from "./Loading";

class User extends Component {
  state = {
    user: null,
    err: null,
    isLoading: true
  };
  render() {
    const { user, isLoading, err } = this.state;
    if (isLoading) return <Loading />;
    if (err) return <ErrorHandler err={err} />;
    return (
      <div className="user">
        <img src={user.avatar_url} width="200px" alt="avatar" />
        <div>
          {user.username} <br />
          Name: {user.name}
          <br />
          Articles: {user.article_count}
        </div>
      </div>
    );
  }
  componentDidMount = () => {
    getUser(this.props.user)
      .then(user => {
        this.setState({ user, isLoading: false });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
}

export default User;
