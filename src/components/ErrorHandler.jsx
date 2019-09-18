import React from "react";

const ErrorHandler = ({ status = 404, msg = "Page not found" }) => {
  return (
    <p>
      {status}:{msg}
    </p>
  );
};

export default ErrorHandler;
