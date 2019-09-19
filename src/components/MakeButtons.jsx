import React from "react";

const MakeButtons = (sortParam, sortItems) => {
  return (
    <>
      <button value={sortParam + " asc"} onClick={sortItems}>
        &and;
      </button>
      <button value={sortParam + " desc"} onClick={sortItems}>
        &or;
      </button>
    </>
  );
};

export default MakeButtons;
