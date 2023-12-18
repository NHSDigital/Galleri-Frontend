import React from "react";

export default function ClinicInvitationCriteria(props) {
  const {
    displayUserErrorTargetPercentage,
    targetFillToInputValue,
    appsToFill,
    onClickTargetAppsToFillHandler,
    onTargetFillToInputChangeHandler,
  } = props;

  return (
    <div
      id="clinic-invitation-criteria-section"
      className="nhsuk-grid-column-two-thirds"
    >
      <h2 id="section-heading" label="header">
        Clinic Invitation Criteria
      </h2>
      <div id="section-content" className="govuk-form-group">
          <label id="target-percentage-input-label" className="govuk-label govuk-label--s nhsuk-u-margin-bottom-4" htmlFor="input-target-percentage">
            Set the target percentage of appointments to fill
          </label>
        {displayUserErrorTargetPercentage && (
          <div id="error-message" className="nhsuk-error-message" role="alert" aria-live="polite">
            The target percentage must be between 1% and 100%
          </div>
        )}
        <div id="user-input-container" className="govuk-input__wrapper">
          <input
            className={
              displayUserErrorTargetPercentage
                ? "govuk-input govuk-input--width-5 govuk-input--error"
                : "govuk-input govuk-input--width-5"
            }
            id="input-target-percentage"
            type="number"
            step="1"
            value={targetFillToInputValue}
            onKeyPress={(event) => {
              if (!Number.isInteger(Number(event.key))) {
                event.preventDefault();
              }
            }}
            spellCheck="false"
            onChange={(e) => onTargetFillToInputChangeHandler(e)}
            aria-labelledby="target-percentage-input-label"
          />
          <div
            id="input-suffix-percentage"
            className={
              displayUserErrorTargetPercentage
                ? "govuk-input__suffix govuk-input__suffix--error"
                : "govuk-input__suffix"
            }
            aria-hidden="true"
          >
            %
          </div>
        </div>
      </div>
      <button
        id="update-button"
        className="nhsuk-button nhsuk-button--secondary"
        data-module="nhsuk-button"
        type="button"
        onClick={() => onClickTargetAppsToFillHandler(targetFillToInputValue)}
      >
        Update
      </button>
      <div>
        <dl id="clinic-invitation-criteria-summary-list" className="nhsuk-summary-list">
          <div id="summary-list-content" className="nhsuk-summary-list__row custom-nhsuk-summary-list__row">
            <dt
              id="term-label"
              className="nhsuk-summary-list__key custom-border-top-1px-solid"
            >
              Target number of appointments to fill
            </dt>
            <dd
              id="target-apps-to-fill"
              className="nhsuk-summary-list__value custom-border-top-1px-solid"
            >
              {appsToFill}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
