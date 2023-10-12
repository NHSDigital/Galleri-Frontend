import React, { useState } from 'react';

export default function InvitationCriteria(props) {
  // const {
  //   isInputTargetPercentageTotal,
  //   InputTargetPercentageTotal,
  //   onUpdateTargetPercentageHandler,
  // } = props;

  const [isInputTargetPercentageTotal, setisInputTargetPercentageTotal] =
    useState(true);
  const [isInputTargetPercentageExceed, setisInputTargetPercentageExceed] =
    useState(true);
  const [inputValue, setInputValue] = useState("");

  // Create an event handler to update the input value
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Create an event handler to process the input value for throwing user Error
  const handleInputError = () => {
    let inputTargetPercentage = inputValue;

    if (inputTargetPercentage === "") {
      setisInputTargetPercentageTotal(false);
    } else {
      setisInputTargetPercentageTotal(true);
    }

    if (inputTargetPercentage > 100) {
      setisInputTargetPercentageExceed(false);
    } else {
      setisInputTargetPercentageExceed(true);
    }
  };

  return (
    <div class="nhsuk-grid-column-two-thirds">
      <h2 label="header">Clinic Invitation Criteria</h2>
      <br />
      <div class="govuk-form-group">
        <h3>
          <label class="govuk-label govuk-label--s" for="weight">
            Set the target percentage of appointments to fill
          </label>
        </h3>
        {!isInputTargetPercentageTotal && (
          <div class="nhsuk-error-message">Enter a percentage to fill</div>
        )}
        {!isInputTargetPercentageExceed && (
          <div class="nhsuk-error-message">
            Percentage of appointments to fill must not exceed 100%
          </div>
        )}
        <div class="govuk-input__wrapper">
          <input
            class={
              isInputTargetPercentageExceed && isInputTargetPercentageTotal
                ? "govuk-input govuk-input--width-5"
                : "govuk-input govuk-input--width-5 govuk-input--error"
            }
            id="weight"
            name="weight"
            type="number"
            spellcheck="false"
            onChange={handleInputChange}
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
        onClick={() => handleInputError()}
      >
        Update
      </button>
      <dl class="nhsuk-summary-list">
        <div class="nhsuk-summary-list__row">
          <dt class="nhsuk-summary-list__key">
            Target number of appointments to fill
          </dt>
          <dd class="nhsuk-summary-list__value">0</dd>
        </div>
      </dl>
    </div>
  );
}
