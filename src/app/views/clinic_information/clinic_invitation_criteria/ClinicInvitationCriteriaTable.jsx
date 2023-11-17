import React from "react";

export default function ClinicInvitationCriteria(props) {
  const {
    isInputTargetPercentageTotal,
    isInputTargetPercentageExceed,
    inputValue,
    appsToFill,
    onClickUpdateHandler,
    handleInputChange,
  } = props;

  // const { appsRemaining } =
  //   props.props;

  return (
    <div class="nhsuk-grid-column-two-thirds">
      <h2 label="header" className="nhsuk-u-margin-bottom-8" >Clinic Invitation Criteria</h2>
      <div class="govuk-form-group">
        <h3>
          <label class="govuk-label govuk-label--s" for="weight">
            Set the target percentage of appointments to fill
          </label>
        </h3>
        {!isInputTargetPercentageTotal && (
          <div class="nhsuk-error-message">The target percentage must be between 1% and 100% </div>
        )}
        {!isInputTargetPercentageExceed && (
          <div class="nhsuk-error-message">
            The target percentage must be between 1% and 100%
          </div>
        )}
        <div class="govuk-input__wrapper">
          <input
            class={
              isInputTargetPercentageExceed && isInputTargetPercentageTotal
                ? "govuk-input govuk-input--width-5"
                : "govuk-input govuk-input--width-5 govuk-input--error"
            }
            data-testid="input-target-percentage"
            name="weight"
            type="number"
            step="1"
            value={inputValue}
            onKeyPress={(event) => {
              if (!Number.isInteger(Number(event.key))) {
                event.preventDefault();
              }
            }}
            spellCheck="false"
            onChange={(e) => handleInputChange(e)}
          />
          <div
            class={
              isInputTargetPercentageExceed && isInputTargetPercentageTotal
                ? "govuk-input__suffix"
                : "govuk-input__suffix govuk-input__suffix--error"
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
        onClick={() => onClickUpdateHandler(inputValue)}
      >
        Update
      </button>
      <dl class="nhsuk-summary-list">
        <div class="nhsuk-summary-list__row">
          <dt class="nhsuk-summary-list__key">
            Target number of appointments to fill
          </dt>
          <dd id="target-apps-to-fill"  class="nhsuk-summary-list__value">{appsToFill}</dd>
        </div>
      </dl>
    </div>
  );
}
