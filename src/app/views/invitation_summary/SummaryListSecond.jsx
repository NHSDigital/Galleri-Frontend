import "../../styles/css/sass.css";
import React from "react";

export default function SummaryListSecond({ dummySummaryList, displayErrorInvitationSummary }) {
  return (
    <>
      {displayErrorInvitationSummary ? (
        <dl
          id="summary-list-2"
          class="nhsuk-summary-list nhsuk-u-margin-bottom-8 nhsuk-error-summary__list"
        >
          <div id="" class="nhsuk-summary-list__row">
            <dt
              style={{ width: "350px" }}
              id="term1-label"
              class="nhsuk-summary-list__key"
            >
              Overall expected uptake
            </dt>
            <dd id="" class="nhsuk-summary-list__value nhsuk-u-padding-left-1">
              {dummySummaryList.expectedUptakeRateHolder}
            </dd>
          </div>
          <div id="" class="nhsuk-summary-list__row">
            <dt
              id="term2-label"
              class="nhsuk-summary-list__key nhsuk-error-message"
            >
              Number of invitations to generate
            </dt>
            <dd id="" class="nhsuk-summary-list__value nhsuk-u-padding-left-1">
              0
            </dd>
          </div>
        </dl>
      ) : (
        <dl
          id="summary-list-2"
          class="nhsuk-summary-list nhsuk-u-margin-bottom-8"
        >
          <div id="" class="nhsuk-summary-list__row">
            <dt
              style={{ width: "350px" }}
              id="term1-label"
              class="nhsuk-summary-list__key"
            >
              Overall expected uptake
            </dt>
            <dd id="" class="nhsuk-summary-list__value nhsuk-u-padding-left-4">
              {dummySummaryList.expectedUptakeRateHolder}
            </dd>
          </div>
          <div id="" class="nhsuk-summary-list__row">
            <dt id="term2-label" class="nhsuk-summary-list__key">
              Number of invitations to generate
            </dt>
            <dd id="" class="nhsuk-summary-list__value nhsuk-u-padding-left-4">
              {dummySummaryList.invitationsToGenerateHolder}
            </dd>
          </div>
        </dl>
      )}
    </>
  );
}
