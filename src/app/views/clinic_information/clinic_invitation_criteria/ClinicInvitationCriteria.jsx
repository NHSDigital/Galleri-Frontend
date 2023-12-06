import React from "react";

export default function ClinicInvitationCriteria(props) {
  const {
    displayUserErrorTargetPercentage,
    targetFillToInputValue,
    appsToFill,
    onClickTargetAppsToFillHandler,
    onTargetFillToInputChangeHandler,
    targetErrorMessage,
  } = props;

  return (
    <div
      id="clinic-invitation-criteria-section"
      class="nhsuk-grid-column-two-thirds"
    >
      <h2 id="section-heading" label="header">
        Clinic Invitation Criteria
      </h2>
      <div id="section-content" class="govuk-form-group">
        <h3 id="input-label">
          <label class="govuk-label govuk-label--s" for="weight">
            Set the target percentage of appointments to fill
          </label>
        </h3>
        {displayUserErrorTargetPercentage && (
          <div id="error-message" class="nhsuk-error-message">
            {targetErrorMessage}
          </div>
        )}
        <div id="user-input-container" class="govuk-input__wrapper">
          <input
            class={
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
          />
          <div
            id="input-suffix-percentage"
            class={
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
        class="nhsuk-button nhsuk-button--secondary"
        data-module="nhsuk-button"
        type="submit"
        onClick={() => onClickTargetAppsToFillHandler(targetFillToInputValue)}
      >
        Update
      </button>
      <div>
        <dl id="summary-list" class="nhsuk-summary-list">
          <div id="summary-list-content" class="nhsuk-summary-list__row">
            <dt
              style={{ borderTop: "1px solid #d8dde0" }}
              id="term-label"
              class="nhsuk-summary-list__key"
            >
              Target number of appointments to fill
            </dt>
            <dd
              style={{ borderTop: "1px solid #d8dde0" }}
              id="target-apps-to-fill"
              class="nhsuk-summary-list__value"
            >
              {appsToFill}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
