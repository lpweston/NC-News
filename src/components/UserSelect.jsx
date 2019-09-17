import React, { Component } from "react";
import { getUsers } from "../utils/api";

class UserSelect extends Component {
  state = {
    usernames: []
  };
  render() {
    const { usernames } = this.state;
    return (
      <div>
        Logged in as: &nbsp;
        <select>
          <option value="Guest" defaultValue>
            Guest
          </option>
          {usernames.map(username => {
            return (
              <option value={username} key={username}>
                {username}
              </option>
            );
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
