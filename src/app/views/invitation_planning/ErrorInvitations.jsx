import "../../styles/css/sass.css";
import React from "react";
import PropTypes from "prop-types";

export default function Errorinvitations(props) {
    const {
        onKeyUp,
        isCorrectTotal,
        isCorrectUptakeTotal,
  } = props;
  return (
    <div
      className="nhsuk-error-summary"
      aria-labelledby="error-summary-title"
      role="alert"
      aria-live="polite"
      tabIndex="0"
      onKeyDown={e => onKeyUp(e)}
    >
      <h2
        className="nhsuk-error-summary__title"
        id="error-target-title"
      >
        There is a problem
      </h2>
      <div className="nhsuk-error-summary__body">
        <ul className="nhsuk-list nhsuk-error-summary__list" role="list">
          <li>
            {!isCorrectUptakeTotal && (
                <a href="#uptake-error-message">
                    The uptake percentage must be between 1% and 100%
            </a>
            )}
          </li>
          <li>
            {!isCorrectTotal && (
                <a href="#quintile-error-message">
                    The fill targets must add up to 100%
                </a>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
Errorinvitations.propTypes = {
  onKeyUp: PropTypes.func.isRequired,
  isCorrectTotal: PropTypes.bool.isRequired,
  isCorrectUptakeTotal: PropTypes.bool.isRequired,
}
