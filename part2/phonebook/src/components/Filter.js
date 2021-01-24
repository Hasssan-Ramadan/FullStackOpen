import React from "react";

const Filter = ({ searchVal, handleValChange }) => {
  return (
    <div>
      filter shown with: <input value={searchVal} onChange={handleValChange} />
    </div>
  );
};

export default Filter;
