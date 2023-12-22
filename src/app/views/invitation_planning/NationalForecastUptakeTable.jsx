import React from "react";
import PropTypes from "prop-types";

export default function NationalForecastUptakeTable(props) {
  const {
    nationalUptakePercentage,
    enableUptakeEdit,
    onUptakeChangeHandler,
    isCorrectUptakeTotal,
  } = props;

  const inputLabel = "National forecast uptake";

  return (
    <table
      className="nhsuk-table-responsive nhsuk-u-margin-bottom-4"
      aria-labelledby="NationalForecastUptakeTableCaption"
    >
      <caption
        id="NationalForecastUptakeTableCaption"
        className="nhsuk-table__caption nhsuk-u-margin-bottom-4"
      >
        {inputLabel}
      </caption>
      <div
        id="national-uptake"
        className={!isCorrectUptakeTotal ? "nhsuk-form-group--error" : ""}
      >
        {!isCorrectUptakeTotal && (
          <div id="uptake-error-message" className="nhsuk-error-message">
            The uptake percentage must be between 1% and 100%
          </div>
        )}
        <thead>
          <tr role="row" className="nhsuk-table__row nhsuk-u-visually-hidden">
            <th role="columnheader" className="nhsuk-table__cell"></th>
            <th role="columnheader" className="nhsuk-table__cell"></th>
          </tr>
        </thead>
        <tbody className="nhsuk-table__body">
          <tr role="row" className="nhsuk-table__row">
            <td role="cell" className="nhsuk-table__cell">
              <strong>Current Percentage</strong>
            </td>
            {enableUptakeEdit ? (
              <td role="cell" className="custom-nhsuk-table__cell">
                <input
                  aria-label={inputLabel}
                  id="national-forecast-uptake"
                  className={`nhsuk-input custom-text-align-center ${
                    isCorrectUptakeTotal ? "" : "nhsuk-input--error"
                  }`}
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  placeholder={nationalUptakePercentage + "%"}
                  onKeyPress={(event) => {
                    if (!Number.isInteger(Number(event.key))) {
                      event.preventDefault();
                    }
                  }}
                  onChange={(e) => onUptakeChangeHandler(e)}
                />
              </td>
            ) : (
              <td role="cell" className="custom-nhsuk-table__cell_1">
                {nationalUptakePercentage}%
              </td>
            )}
          </tr>
        </tbody>
      </div>
    </table>
  );
}
NationalForecastUptakeTable.propTypes = {
  nationalUptakePercentage: PropTypes.number.isRequired,
  enableUptakeEdit: PropTypes.bool.isRequired,
  onUptakeChangeHandler: PropTypes.func.isRequired,
  isCorrectUptakeTotal: PropTypes.bool.isRequired,
};
