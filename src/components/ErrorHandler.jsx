import React from "react";
import SideBar from "./SideBar";

const ErrorHandler = ({ status = 404, msg = "Page not found" }) => {
  return (
    <>
      <SideBar />
      <section>
        <p>
          {status}:{msg}
        </p>{" "}
      </section>
    </>
  );
};

export default ErrorHandler;
