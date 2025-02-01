import React from "react";

function Popup({ children, closePopup = undefined, className, ...props }) {
  return (
    <div className={`popup ${className}`} {...props}>
      {closePopup && (
        <button className="close" onClick={closePopup}>
          X
        </button>
      )}
      {children}
    </div>
  );
}

export default Popup;
