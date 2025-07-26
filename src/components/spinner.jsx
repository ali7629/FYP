import React from "react";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      {/* Spinner Loader */}
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
