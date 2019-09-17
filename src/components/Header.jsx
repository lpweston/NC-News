import React from "react";
import Nav from "./Nav";
import UserSelect from "./UserSelect";

const Header = ({ login }) => {
  return (
    <header>
      <h1>NorthCoders News</h1>
      <Nav />
      <UserSelect login={login} />
      <hr />
    </header>
  );
};

export default Header;
