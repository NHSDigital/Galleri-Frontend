import "../../styles/css/sass.css";
import React from "react";

export default function Errorinvitations(props) {
  const { onKeyUp, isCorrectTotal, isCorrectUptakeTotal } = props;

  // Check if there are errors
  const hasErrors = !isCorrectUptakeTotal || !isCorrectTotal;

  return (
    // Only render the error summary if there are errors
    hasErrors && (
      <div
        className="nhsuk-error-summary"
        aria-labelledby="error-target-title"
        role="alert"
        tabIndex="0"
        onKeyDown={(e) => onKeyUp(e)}
      >
        <h2 className="nhsuk-error-summary__title" id="error-target-title">
          There is a problem
        </h2>
        <div className="nhsuk-error-summary__body">
          <ul className="nhsuk-list nhsuk-error-summary__list">
            {!isCorrectUptakeTotal && (
              <li>
                <a href="#uptake-error-message">
                  The uptake percentage must be between 1% and 100%
                </a>
              </li>
            )}
            {!isCorrectTotal && (
              <li>
                <a href="#quintile-error-message">
                  The fill targets must add up to 100%
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  );
}
