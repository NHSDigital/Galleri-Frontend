import "../../styles/css/sass.css";
import React from "react";

export default function SummaryListFirst({ dummySummaryList }) {
  return (
    <dl id="summary-list-1" class="nhsuk-summary-list nhsuk-u-margin-bottom-9">
      <div class="nhsuk-summary-list__row">
        <dt
          style={{ width: "350px" }}
          id="term1-label"
          class="nhsuk-summary-list__key"
        >
          Distance from clinic
        </dt>
        <dd id="term1-value" class="nhsuk-summary-list__value nhsuk-u-padding-left-4">
          {dummySummaryList.clinicDistanceHolder}
        </dd>
      </div>
      <div class="nhsuk-summary-list__row">
        <dt id="term2-label" class="nhsuk-summary-list__key">
          Total available to invite
        </dt>
        <dd id="term2-value" class="nhsuk-summary-list__value nhsuk-u-padding-left-4">
          {dummySummaryList.availableInvitationsHolder}
        </dd>
      </div>
      <div class="nhsuk-summary-list__row">
        <dt id="term3-label" class="nhsuk-summary-list__key">
          Appointments remaining
        </dt>
        <dd id="term3-value" class="nhsuk-summary-list__value nhsuk-u-padding-left-4">
          {dummySummaryList.remainingAppointmentsHolder}
        </dd>
      </div>
      <div class="nhsuk-summary-list__row">
        <dt id="term4-label" class="nhsuk-summary-list__key">
          Target percentage of appointments to fill
        </dt>
        <dd id="term4-value" class="nhsuk-summary-list__value nhsuk-u-padding-left-4">
          {dummySummaryList.targetFillPercentageHolder}
        </dd>
      </div>
      <div class="nhsuk-summary-list__row">
        <dt id="term5-label" class="nhsuk-summary-list__key">
          Target number of appointments to fill
        </dt>
        <dd id="term5-value" class="nhsuk-summary-list__value nhsuk-u-padding-left-4">
          {dummySummaryList.targetAppointmentsToFillHolder}
        </dd>
      </div>
    </dl>
  );
}