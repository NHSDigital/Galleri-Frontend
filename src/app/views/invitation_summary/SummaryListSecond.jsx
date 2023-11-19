import "../../styles/css/sass.css";
import React from "react";

export default function SummaryListSecond({
  dummySummaryList,
  displayErrorInvitationSummary,
  targetAppToFill,
  avgExpectedUptake
}) {
  return (
    <>
      {displayErrorInvitationSummary ? (
        <dl
          data-testid="summary-list-2-error"
          id="summary-list-2"
          class="nhsuk-summary-list nhsuk-u-margin-bottom-8 nhsuk-error-summary__list"
        >
          <div class="nhsuk-summary-list__row">
            <dt
              style={{ width: "350px" }}
              id="term1-label"
              class="nhsuk-summary-list__key"
            >
              Overall expected uptake
            </dt>
            <dd id="term1-value" class="nhsuk-summary-list__value nhsuk-u-padding-left-1">
              {avgExpectedUptake}%
            </dd>
          </div>
          <div class="nhsuk-summary-list__row">
            <dt
              id="term2-label"
              class="nhsuk-summary-list__key nhsuk-error-message"
            >
              Number of invitations to generate
            </dt>
            <dd id="term2-value" class="nhsuk-summary-list__value nhsuk-u-padding-left-1">
              0
            </dd>
          </div>
        </dl>
      ) : (
        <dl
          data-testid="summary-list-2"
          id="summary-list-2"
          class="nhsuk-summary-list nhsuk-u-margin-bottom-8"
        >
          <div class="nhsuk-summary-list__row">
            <dt
              style={{ width: "350px" }}
              id="term1-label"
              class="nhsuk-summary-list__key"
            >
              Overall expected uptake
            </dt>
            <dd id="term1-value" class="nhsuk-summary-list__value nhsuk-u-padding-left-4">
              {avgExpectedUptake}%
            </dd>
          </div>
          <div class="nhsuk-summary-list__row">
            <dt id="term2-label" class="nhsuk-summary-list__key">
              Number of invitations to generate
            </dt>
            <dd id="term2-value" class="nhsuk-summary-list__value nhsuk-u-padding-left-4">
              {Math.round(targetAppToFill/(avgExpectedUptake/100))}
            </dd>
          </div>
        </dl>
      )}
    </>
  );
}
