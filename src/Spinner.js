import React from "react";

function Spinner() {
  return (
    <div className="Spinner">
      <h2>Loading...</h2>
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Spinner;
