import React from "react";
import { Link } from "@reach/router";

const Nav = () => {
  return (
    <nav>
      <h2>
        <Link to="/newarticle">
          <b>&lt;</b> Post New Article <b>/&gt;</b>
        </Link>
      </h2>
      <h2>
        <Link to="/users">
          <b>&lt;</b> Users <b>/&gt;</b>
        </Link>
      </h2>
    </nav>
  );
};

export default Nav;
