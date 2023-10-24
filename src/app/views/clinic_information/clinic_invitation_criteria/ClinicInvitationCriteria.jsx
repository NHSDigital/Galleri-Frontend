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
    <div class="nhsuk-grid-column-two-thirds">
      <h2 label="header">Clinic Invitation Criteria</h2>
      <div class="govuk-form-group">
        <h3>
          <label class="govuk-label govuk-label--s" for="weight">
            Set the target percentage of appointments to fill
          </label>
        </h3>
        {displayUserErrorTargetPercentage && (
          <div class="nhsuk-error-message">
            The target percentage must be between 1% and 100%{" "}
          </div>
        )}
        <div class="govuk-input__wrapper">
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
        class="nhsuk-button nhsuk-button--secondary"
        data-module="nhsuk-button"
        type="submit"
        onClick={() => onClickTargetAppsToFillHandler(targetFillToInputValue)}
      >
        Update
      </button>
      <dl class="nhsuk-summary-list">
        <div class="nhsuk-summary-list__row">
          <dt class="nhsuk-summary-list__key">
            Target number of appointments to fill
          </dt>
          <dd id="target-apps-to-fill" class="nhsuk-summary-list__value">
            {appsToFill}
          </dd>
        </div>
      </dl>
    </div>
  );
}
