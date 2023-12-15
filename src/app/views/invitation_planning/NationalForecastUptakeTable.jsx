import React from "react";

export default function NationalForecastUptakeTable(props) {
  const { nationalUptakePercentage, enableUptakeEdit, onUptakeChangeHandler } =
    props;
  return (
    <table role="table" className="nhsuk-table-responsive">
      <caption
        className="nhsuk-table__caption"
        style={{ "padding-bottom": "16px" }}
      >
        National forecast uptake
        <br />
      </caption>
      <tbody className="nhsuk-table__body">
        <tr role="row" className="nhsuk-table__row">
          <td role="cell" className="nhsuk-table__cell">
            <b>Current Percentage</b>
          </td>
          {enableUptakeEdit ? (
            <td
              role="cell"
              className="nhsuk-table__cell"
              style={{ "padding-right": "2px", width: "100px" }}
            >
              <input
                className="nhsuk-input"
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
              className="nhsuk-table__cell"
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
            className="nhsuk-table__cell"
            style={{ "vertical-align": "middle" }}
          >
            %
          </td>
        </tr>
      </tbody>
    </table>
  );
}
