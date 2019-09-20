import React from "react";
import SideBar from "./SideBar";

const ErrorHandler = ({
  status = 404,
  msg = "Page not found",
  needSidebar
}) => {
  return (
    <>
      {needSidebar && <SideBar />}
      <section>
        <p>
          {status}:{msg}
        </p>{" "}
      </section>
    </>
  );
};

export default ErrorHandler;
