import React, { Component } from "react";
import { getUsers } from "../utils/api";
import { Link } from "@reach/router";
import ErrorHandler from "./ErrorHandler";
import Loading from "./Loading";
import SideBar from "./SideBar";

class Users extends Component {
  state = {
    users: [],
    err: null,
    isLoading: true
  };
  render() {
    const { users, isLoading, err } = this.state;
    if (err) return <ErrorHandler {...err} needSidebar={true} />;
    if (isLoading) return <Loading />;
    return (
      <>
        <SideBar />
        <section>
          <div id="users">
            <h2>Users</h2>
            <Link to="/newuser">Add New User</Link>
            <ul id="usersList">
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
          </div>
        </section>{" "}
      </>
    );
  }
  componentDidMount = () => {
    getUsers()
      .then(users => {
        this.setState({ users, isLoading: false });
      })
      .catch(({ response }) => {
        const { status } = response;
        const { msg } = response.data;
        this.setState({ err: { status, msg }, isLoading: false });
      });
  };
}

export default Users;
