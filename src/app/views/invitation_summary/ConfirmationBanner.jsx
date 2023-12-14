import "../../styles/css/sass.css";
import React from "react";

export default function ConfirmationBanner() {
  return (
    <div data-testid="confirmation-banner" id="confirmation-banner" className="govuk-panel govuk-panel--confirmation nhsuk-u-margin-bottom-7">
      <h1 className="govuk-panel__title">Complete</h1>
      <div className="govuk-panel__body">
        Your invitations are confirmed and will be sent at the end of the day.
      </div>
    </div>
  );
}
