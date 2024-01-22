import "../../styles/css/sass.css";
import React from "react";

export default function ConfirmationBanner() {
  return (
    <section
      data-testid="confirmation-banner"
      id="confirmation-banner"
      className="govuk-panel govuk-panel--confirmation nhsuk-u-margin-bottom-7"
    >
      <h1 id="confirm-banner-title" className="govuk-panel__title">
        Complete
      </h1>
      <div className="govuk-panel__body" aria-labelledby="confirm-banner-title">
        Your invitations are confirmed and will be sent at the end of the day.
      </div>
    </section>
  );
}
