import React from "react";

function Loading({ message = "loading" }) {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p className="message">{message} ...</p>
    </div>
  );
}

export default Loading;
