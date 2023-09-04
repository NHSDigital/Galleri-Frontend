import React from "react";

export default function NationalForecastUptakeTable(props) {
  const { nationalUptakePercentage, enableUptakeEdit, onUptakeChangeHandler } =
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
    </table>
  );
}
