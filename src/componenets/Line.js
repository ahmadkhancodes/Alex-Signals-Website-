import React from "react";

function Line({ color }) {
  return (
    <>
      <hr
        style={{
          fontSize: 10,
          color: color,
          margin: 0,
          padding: 0,
        }}
      />
    </>
  );
}

export default Line;
