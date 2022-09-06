import React from "react";

function Line({ color, display }) {
  return (
    <>
      <hr
        style={{
          fontSize: 10,
          color: color,
          margin: 0,
          padding: 0,
          display: display,
        }}
      />
    </>
  );
}

export default Line;
