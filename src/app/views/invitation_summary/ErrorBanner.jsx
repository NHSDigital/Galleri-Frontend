import "../../styles/css/sass.css";
import React from "react";

export default function ErrorBanner(props) {
  const { totalToInvite, noInviteToGenerate } = props
  return (
    <div>
      { noInviteToGenerate > totalToInvite ? (
      <div
        data-testid="error-banner"
        class="nhsuk-error-summary nhsuk-u-padding-bottom-0"
        aria-labelledby="error-summary-title"
        role="alert"
        tabindex="-1"
      >
        <h2
          class="nhsuk-error-summary__title nhsuk-u-margin-bottom-2"
          id="error-summary-title"
        >
          There is a problem
        </h2>
        <div class="nhsuk-error-summary__body">
          <p>Number of invitations to generate exceeds the total available to invite. Please expand range to meet desired appointments to fill</p>
        </div>
      </div>
      ): (
      <div
        data-testid="error-banner"
        class="nhsuk-error-summary nhsuk-u-padding-bottom-0"
        aria-labelledby="error-summary-title"
        role="alert"
        tabindex="-1"
      >
        <h2
          class="nhsuk-error-summary__title nhsuk-u-margin-bottom-2"
          id="error-summary-title"
        >
          There is a problem
        </h2>
        <div class="nhsuk-error-summary__body">
          <p>There are no invitations to generate</p>
        </div>
      </div>
      )
      }
    </div>

  );
}
