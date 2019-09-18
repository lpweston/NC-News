import React from "react";
import { Link } from "@reach/router";

const Nav = () => {
  return (
    <nav>
      <Link to="/">Articles</Link> &nbsp; &middot; &nbsp;
      <Link to="/newarticle">Post New Article</Link> &nbsp; &middot; &nbsp;
      <Link to="/users">Users</Link>
    </nav>
  );
};

export default Nav;
