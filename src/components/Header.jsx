import React from "react";
import Nav from "./Nav";
import UserSelect from "./UserSelect";

const Header = () => {
  return (
    <header>
      <h1>NorthCoders News</h1>
      <Nav />
      <UserSelect />
      <hr />
    </header>
  );
};

export default Header;
