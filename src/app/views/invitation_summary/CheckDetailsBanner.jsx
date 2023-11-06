import "../../styles/css/sass.css";
import React from "react";

export default function CheckDetailsBanner() {
  return (
    <div className="nhsuk-inset-text">
      <span className="nhsuk-u-visually-hidden">Validation Alert: </span>
      <h3>Check these details before you generate invitations</h3>
    </div>
  );
}
