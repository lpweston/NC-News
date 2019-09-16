import React, { Component } from "react";
import { getUsers } from "../utils/api";
import { Link } from "@reach/router";

class Users extends Component {
  state = {
    users: []
  };
  render() {
    const { users } = this.state;
    return (
      <>
        <h2>Users</h2>
        <ul id="users">
          {users.map(user => {
            return (
              <li key={user.username} className="user">
                <img src={user.avatar_url} width="100px" alt="avatar" />
                <div>
                  <Link to={`/users/${user.username}`}>
                    {user.username} <br />
                  </Link>
                  Name: {user.name}
                  <br />
                  Articles: {user.article_count}
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  }
  componentDidMount = () => {
    getUsers().then(users => {
      this.setState({ users });
    });
  };
}

export default Users;
