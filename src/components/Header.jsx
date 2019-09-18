import React from "react";
import Nav from "./Nav";
import UserSelect from "./UserSelect";
import "../styles/header.css";

const Header = ({ login }) => {
  return (
    <header>
      <h1>NorthCoders News</h1>
      <Nav />
      <UserSelect login={login} />
    </header>
  );
};

export default Header;
