import React from "react";
import { quintileHintText } from "./helper";

export default function QuintileTargetTable(props) {
  const {
    quintileValues,
    quintileValuesAux,
    onQuintileChangeHandler,
    enableFillEdit,
    sumQuintiles,
  } = props;

  return (
    <table role="table" class="nhsuk-table-responsive">
      <caption
        class="nhsuk-table__caption"
        style={{ "padding-bottom": "16px" }}
      >
        Quintile fill target
        <br />
      </caption>
      <tbody class="nhsuk-table__body">
        {Object.keys(quintileValues)
          .sort()
          .map((quintile) => {
            return (
              <tr role="row" class="nhsuk-table__row">
                <td role="cell" class="nhsuk-table__cell">
                  {quintileHintText(quintile)}
                </td>
                {enableFillEdit ? (
                  <td
                    role="cell"
                    class="nhsuk-table__cell"
                    style={{ "padding-right": "2px", width: "100px" }}
                  >
                    <input
                      class="nhsuk-input"
                      style={{ textAlign: "right", color: "black" }}
                      type="number"
                      min="0"
                      step="1"
                      placeholder={quintileValues[`${quintile}`]}
                      onKeyPress={(event) => {
                        if (!Number.isInteger(Number(event.key))) {
                          event.preventDefault();
                        }
                      }}
                      onChange={(e) => onQuintileChangeHandler(e, quintile)}
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
                    {quintileValues[`${quintile}`]}
                  </td>
                )}
                <td
                  role="cell"
                  class="nhsuk-table__cell"
                  style={{ "vertical-align": "middle" }}
                >
                  <b>%</b>
                </td>
              </tr>
            );
          })}
        <tr role="cell" class="nhsuk-table__cell">
          <td role="cell" class="nhsuk-table__cell">
            <b>Total percentage</b>
          </td>
          {enableFillEdit ? (
            <td
              role="cell"
              class="nhsuk-table__cell"
              style={{ textAlign: "right", "padding-right": "2px" }}
            >
              {sumQuintiles(quintileValuesAux)}
            </td>
          ) : (
            <td
              role="cell"
              class="nhsuk-table__cell"
              style={{ textAlign: "right", "padding-right": "2px" }}
            >
              {sumQuintiles(quintileValues)}
            </td>
          )}
          <td
            role="cell"
            class="nhsuk-table__cell"
            style={{ "vertical-align": "middle" }}
          >
            <b>%</b>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
