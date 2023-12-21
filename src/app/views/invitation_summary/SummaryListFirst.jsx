import "../../styles/css/sass.css";
import React from "react";

export default function SummaryListFirst({
  props,
  rangeSelection,
  targetAppToFill,
  targetPercentageToFill,
  totalToInvite
  })
  {
    const { appsRemaining } = props;

    return (
      <dl id="summary-list-1" className="nhsuk-summary-list nhsuk-u-margin-bottom-9">
        <div className="nhsuk-summary-list__row">
          <dt
            style={{ width: "350px" }}
            id="term1-label"
            className="nhsuk-summary-list__key"
          >
            Distance from clinic
          </dt>
          <dd
            id="term1-value"
            className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
          >
            + {rangeSelection} miles
          </dd>
        </div>
        <div className="nhsuk-summary-list__row">
          <dt id="term2-label" className="nhsuk-summary-list__key">
            Total available to invite
          </dt>
          <dd
            id="term2-value"
            className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
          >
            {totalToInvite}
          </dd>
        </div>
        <div className="nhsuk-summary-list__row">
          <dt id="term3-label" className="nhsuk-summary-list__key">
            Appointments remaining
          </dt>
          <dd
            id="term3-value"
            className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
          >
            {appsRemaining}
          </dd>
        </div>
        <div className="nhsuk-summary-list__row">
          <dt id="term4-label" className="nhsuk-summary-list__key">
            Target percentage of appointments to fill
          </dt>
          <dd
            id="term4-value"
            className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
          >
            {targetPercentageToFill}%
          </dd>
        </div>
        <div className="nhsuk-summary-list__row">
          <dt id="term5-label" className="nhsuk-summary-list__key">
            Target number of appointments to fill
          </dt>
          <dd
            id="term5-value"
            className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
          >
            {targetAppToFill}
          </dd>
        </div>
      </dl>
    );
}
