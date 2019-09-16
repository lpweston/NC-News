import React, { Component } from "react";
import { getUser } from "../utils/api";

class User extends Component {
  state = {
    user: {
      username: this.props.user
    }
  };
  render() {
    const { user } = this.state;
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
    getUser(this.props.user).then(user => {
      this.setState({ user });
    });
  };
}

export default User;
