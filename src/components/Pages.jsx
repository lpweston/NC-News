import React from "react";

const Pages = ({ page, totalPages, changePage, changeLimit }) => {
  return (
    <>
      <button
        onClick={() => {
          changePage(-1);
        }}
        disabled={page === 1}
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
      </button>{" "}
      Items per page:{" "}
      <select onChange={changeLimit}>
        <option>5</option>
        <option selected>10</option>
        <option>20</option>
      </select>
    </>
  );
};

export default Pages;
