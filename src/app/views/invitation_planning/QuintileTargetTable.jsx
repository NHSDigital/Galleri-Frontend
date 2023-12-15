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
    <table role="table" className="nhsuk-table-responsive">
      <caption
        className="nhsuk-table__caption"
        style={{ "padding-bottom": "16px" }}
      >
        Quintile fill target
        <br />
      </caption>
      <tbody className="nhsuk-table__body">
        {Object.keys(quintileValues)
          .sort()
          .map((quintile) => {
            return (
              <tr role="row" className="nhsuk-table__row">
                <td role="cell" className="nhsuk-table__cell">
                  {quintileHintText(quintile)}
                </td>
                {enableFillEdit ? (
                  <td
                    role="cell"
                    className="nhsuk-table__cell"
                    style={{ "padding-right": "2px", width: "100px" }}
                  >
                    <input
                      className="nhsuk-input"
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
                    className="nhsuk-table__cell"
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
                  className="nhsuk-table__cell"
                  style={{ "vertical-align": "middle" }}
                >
                  <b>%</b>
                </td>
              </tr>
            );
          })}
        <tr role="cell" className="nhsuk-table__cell">
          <td role="cell" className="nhsuk-table__cell">
            <b>Total percentage</b>
          </td>
          {enableFillEdit ? (
            <td
              role="cell"
              className="nhsuk-table__cell"
              style={{ textAlign: "right", "padding-right": "2px" }}
            >
              {sumQuintiles(quintileValuesAux)}
            </td>
          ) : (
            <td
              role="cell"
              className="nhsuk-table__cell"
              style={{ textAlign: "right", "padding-right": "2px" }}
            >
              {sumQuintiles(quintileValues)}
            </td>
          )}
          <td
            role="cell"
            className="nhsuk-table__cell"
            style={{ "vertical-align": "middle" }}
          >
            <b>%</b>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
