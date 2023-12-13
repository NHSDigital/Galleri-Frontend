import React from "react";
import PropTypes from "prop-types";

export default function NationalForecastUptakeTable(props) {
  const { nationalUptakePercentage, enableUptakeEdit, onUptakeChangeHandler, isCorrectUptakeTotal } =
    props;
  return (
    <table role="table" class="nhsuk-table-responsive">
      <caption
        class="nhsuk-table__caption"
        style={{ "padding-bottom": "16px" }}
      >
        National forecast uptake
        <br />
      </caption>
      <div id="national-uptake"
          class={(!isCorrectUptakeTotal)
            ? "nhsuk-form-group--error"
            : ""
          }
        >
        {!isCorrectUptakeTotal && (
          <div id="uptake-error-message" class="nhsuk-error-message">
            The uptake percentage must be between 1% and 100%
          </div>
        )}
      <tbody class="nhsuk-table__body">
        <tr role="row" class="nhsuk-table__row">
          <td role="cell" class="nhsuk-table__cell">
            <b>Current Percentage</b>
          </td>
          {enableUptakeEdit ? (
            <td
              role="cell"
              class="nhsuk-table__cell"
              style={{ "padding-right": "2px", width: "100px" }}
            >
              <input
                id="national-forecast-uptake"
                class="nhsuk-input"
                style={{
                  textAlign: "right",
                  color: "black",
                }}
                type="number"
                min="0"
                max="100"
                step="1"
                placeholder={nationalUptakePercentage}
                onKeyPress={(event) => {
                  if (!Number.isInteger(Number(event.key))) {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => onUptakeChangeHandler(e)}
              />
            </td>
          ) : (
            <td
              role="cell"
              class="nhsuk-table__cell"
              style={{
                textAlign: "right",
                "padding-right": "2px",
                width: "100px",
              }}
            >
              {nationalUptakePercentage}
            </td>
          )}
          <td
            role="cell"
            class="nhsuk-table__cell"
            style={{ "vertical-align": "middle" }}
          >
            %
          </td>
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