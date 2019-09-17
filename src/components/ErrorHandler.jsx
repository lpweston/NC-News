import React from "react";

const ErrorHandler = ({ status = 404, msg = "page not found" }) => {
  return (
    <p>
      {status}:{msg}
    </p>
  );
};

export default ErrorHandler;
