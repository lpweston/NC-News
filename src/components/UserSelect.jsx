import React, { Component } from "react";
import { getUsers } from "../utils/api";

class UserSelect extends Component {
  state = {
    usernames: ["guest"],
    selected: "guest"
  };
  render() {
    const { usernames, selected } = this.state;
    const { login } = this.props;
    return (
      <div className="UserSelect">
        <label>
          Logged in as: &nbsp;
          <select onChange={login} defaultValue={selected}>
            {usernames.map(username => {
              return (
                <option value={username} key={username}>
                  {username}
                </option>
              );
            })}
          </select>
        </label>
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
