import "../../styles/css/sass.css";
import React from "react";

export default function ConfirmationBanner() {
  return (
    <div className="govuk-panel govuk-panel--confirmation nhsuk-u-margin-bottom-7">
      <h1 className="govuk-panel__title">Complete</h1>
      <div className="govuk-panel__body">
        The invitations have been generated
      </div>
    </div>
  );
}
