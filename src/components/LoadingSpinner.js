import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      {/* <div className="loading-spinner">Loading...</div> */}

      <div className="loading-spinner"><img className="loading-gif" src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif" alt="loading"/></div>
    </div>
  );
}