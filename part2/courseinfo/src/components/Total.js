import React from "react";

const Total = ({ parts }) => {
  const partsExs = parts.map((part) => part.exercises);
  const numOfExs = partsExs.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );

  return (
    <>
      <p>Number of exercises {numOfExs}</p>
    </>
  );
};

export default Total;
