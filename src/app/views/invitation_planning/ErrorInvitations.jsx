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
      class="nhsuk-error-summary"
      aria-labelledby="error-summary-title"
      role="alert"
      aria-live="polite"
      tabIndex="0"
      onKeyDown={e => onKeyUp(e)}
    >
      <h2
        class="nhsuk-error-summary__title"
        id="error-target-title"
      >
        There is a problem
      </h2>
      <div class="nhsuk-error-summary__body">
        <ul class="nhsuk-list nhsuk-error-summary__list" role="list"> 
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
