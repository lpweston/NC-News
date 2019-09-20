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
      <div className="UserSelect">
        Logged in as: &nbsp;
        <select onChange={login} defaultValue="guest">
          <option>guest</option>
          {usernames
            .filter(username => username !== "guest")
            .map(username => {
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
