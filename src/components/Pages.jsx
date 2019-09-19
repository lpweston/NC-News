import React from "react";

const Pages = ({ page, totalPages, changePage }) => {
  return (
    <>
      <button
        onClick={() => {
          changePage(-1);
        }}
        disabled={page 
      >
        <b>&lt;</b>
      </button>{" "}
      Page: {page} {totalPages && `of ${totalPages}`}{" "}
      <button
        onClick={() => {
          changePage(1);
        }}
        disabled={page === totalPages}
      >
        <b>&gt;</b>
      </button>
    </>
  );
};

export default Pages;
