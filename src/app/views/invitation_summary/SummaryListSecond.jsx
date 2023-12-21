import "../../styles/css/sass.css";
import React from "react";

export default function SummaryListSecond({
  displayErrorInvitationSummary,
  avgExpectedUptake,
  noInviteToGenerate,
}) {
  return (
    <>
      {displayErrorInvitationSummary ? (
        <dl
          data-testid="summary-list-2-error"
          id="summary-list-2"
          className="nhsuk-summary-list nhsuk-u-margin-bottom-8 nhsuk-error-summary__list"
        >
          <div className="nhsuk-summary-list__row">
            <dt
              id="term1-label"
              className="nhsuk-summary-list__key nhsuk-error-message"
            >
              Number of invitations to generate
            </dt>
            <dd
              id="term1-value"
              className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
            >
              0
            </dd>
          </div>
          <div className="nhsuk-summary-list__row">
            <dt id="term2-label" className="nhsuk-summary-list__key">
              Overall expected uptake
            </dt>
            <dd
              id="term2-value"
              className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
            >
              {avgExpectedUptake}%
            </dd>
          </div>
          <div class="nhsuk-summary-list__row">
            <dt id="term3-label" class="nhsuk-summary-list__key">
              Estimated appointments that will be filled
            </dt>
            <dd
              id="term3-value"
              className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
            >
              0
            </dd>
          </div>
        </dl>
      ) : (
        <dl
          data-testid="summary-list-2"
          id="summary-list-2"
          className="nhsuk-summary-list nhsuk-u-margin-bottom-8"
        >
          <div class="nhsuk-summary-list__row">
            <dt
              id="term1-label"
              className="nhsuk-summary-list__key nhsuk-summary-list-custom__key"
            >
              Number of invitations to generate
            </dt>
            <dd
              id="term1-value"
              className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
            >
              {noInviteToGenerate}
            </dd>
          </div>
          <div className="nhsuk-summary-list__row">
            <dt
              id="term2-label"
              class="nhsuk-summary-list__key nhsuk-summary-list-custom__key"
            >
              Overall expected uptake
            </dt>
            <dd
              id="term2-value"
              className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
            >
              {avgExpectedUptake}%
            </dd>
          </div>
          <div class="nhsuk-summary-list__row">
            <dt
              id="term3-label"
              className="nhsuk-summary-list__key nhsuk-summary-list-custom__key"
            >
              Estimated appointments that will be filled
            </dt>
            <dd
              id="term3-value"
              className="nhsuk-summary-list__value nhsuk-u-padding-left-4 nhsuk-summary-list__value_custom__value"
            >
              {Math.floor((noInviteToGenerate * avgExpectedUptake) / 100)}
            </dd>
          </div>
        </dl>
      )}
    </>
  );
}
