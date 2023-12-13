import "../../styles/css/sass.css";
import React from "react";

export default function Errorinvitations(props) {
    const {
        onKeyUp,
        isCorrectTotal,
        isCorrectUptakeTotal,
  } = props;
  return (
    <div
      data-testid="error-banner"
      class="nhsuk-error-summary nhsuk-u-padding-bottom-0"
      aria-labelledby="error-summary-title"
      role="alert"
      tabindex="-1"
      onKeyDown={e => onKeyUp(e)}
    >
      <h2
        class="nhsuk-error-summary__title nhsuk-u-margin-bottom-2"
        id="error-target-title"
      >
        There is a problem
      </h2>
      <div class="nhsuk-error-summary__body">
            {!isCorrectUptakeTotal && (
                <a href="#uptake-error-message">
                    The uptake percentage must be between 1% and 100%
            </a>
            )}
            <br></br>
            {!isCorrectTotal && (
                <a href="#quintile-error-message">
                    The fill targets must add up to 100%
                </a>
            )}
        </div>
    </div>
  );
}
