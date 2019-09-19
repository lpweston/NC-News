import React from "react";
import { Link } from "@reach/router";

const Nav = () => {
  return (
    <nav>
      <h3>
        <Link to="/newarticle">
          <b>&lt;</b> Post New Article <b>/&gt;</b>
        </Link>
      </h3>
      <h3>
        <Link to="/users">
          <b>&lt;</b> Users <b>/&gt;</b>
        </Link>
      </h3>
    </nav>
  );
};

export default Nav;
