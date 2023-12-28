import "../../styles/css/sass.css";
import React from "react";
import PropTypes from "prop-types";

export default function SummaryListFirst({
  props,
  rangeSelection,
  targetAppToFill,
  targetPercentageToFill,
  totalToInvite,
}) {
  const { appsRemaining } = props;

  return (
    <dl
      id="summary-list-1"
      className="nhsuk-summary-list nhsuk-u-margin-bottom-9"
    >
      <div className="nhsuk-summary-list__row">
        <dt
          id="appointments-remaining-label"
          className="nhsuk-summary-list__key nhsuk-summary-list-custom__key"
        >
          Appointments remaining
        </dt>
        <dd
          id="appointments-remaining-value"
          className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
        >
          {appsRemaining}
        </dd>
      </div>
      <div className="nhsuk-summary-list__row">
        <dt
          id="target-percentage-label"
          className="nhsuk-summary-list__key nhsuk-summary-list-custom__key"
        >
          Target percentage of appointments to fill
        </dt>
        <dd
          id="target-percentage-value"
          className="nhsuk-summary-list__value nhsuk-u-padding-left-4 nhsuk-summary-list__value_custom__value"
        >
          {targetPercentageToFill}%
        </dd>
      </div>
      <div className="nhsuk-summary-list__row">
        <dt
          id="target-appointments-label"
          className="nhsuk-summary-list__key nhsuk-summary-list-custom__key"
        >
          Target number of appointments to fill
        </dt>
        <dd
          id="target-appointments-value"
          className="nhsuk-summary-list__value nhsuk-u-padding-left-4 nhsuk-summary-list__value_custom__value"
        >
          {targetAppToFill}
        </dd>
      </div>
      <div className="nhsuk-summary-list__row">
        <dt
          id="distance-from-clinic-label"
          className="nhsuk-summary-list__key nhsuk-summary-list-custom__key"
        >
          Distance from clinic
        </dt>
        <dd
          id="distance-from-clinic-value"
          className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
        >
          + {rangeSelection} miles
        </dd>
      </div>
      <div className="nhsuk-summary-list__row">
        <dt
          id="total-available-label"
          className="nhsuk-summary-list__key nhsuk-summary-list-custom__key"
        >
          Total available to invite
        </dt>
        <dd
          id="total-available-value"
          className="nhsuk-summary-list__value nhsuk-u-padding-left-4"
        >
          {totalToInvite}
        </dd>
      </div>
    </dl>
  );
}
SummaryListFirst.propTypes = {
  props: PropTypes.shape({
    appsRemaining: PropTypes.number.isRequired,
  }).isRequired,
  rangeSelection: PropTypes.number.isRequired,
  targetAppToFill: PropTypes.number.isRequired,
  targetPercentageToFill: PropTypes.number.isRequired,
  totalToInvite: PropTypes.number.isRequired,
};
