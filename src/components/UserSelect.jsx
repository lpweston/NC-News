import React, { Component } from "react";
import { getUsers } from "../utils/api";

class UserSelect extends Component {
  state = {
    usernames: []
  };
  render() {
    const { usernames } = this.state;
    const { login } = this.props;
    return (
      <div>
        Logged in as: &nbsp;
        <select onChange={login}>
          {usernames.map(username => {
            if (username === "guest") {
              return (
                <option key={username} selected>
                  {username}
                </option>
              );
            }
            return <option key={username}>{username}</option>;
          })}
        </select>
      </div>
    );
  }

  componentDidMount = () => {
    getUsers().then(users => {
      const usernames = users.map(user => user.username);
      this.setState({ usernames });
    });
  };
}

export default UserSelect;
