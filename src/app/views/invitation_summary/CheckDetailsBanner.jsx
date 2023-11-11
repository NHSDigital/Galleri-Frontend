import "../../styles/css/sass.css";
import React from "react";

export default function CheckDetailsBanner() {
  return (
    <div data-testid="check-details-banner" id="check-details-banner" className="nhsuk-inset-text">
      <span className="nhsuk-u-visually-hidden">Validation Alert: </span>
      <h3>Check these details before you generate invitations</h3>
    </div>
  );
}
