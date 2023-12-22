import React from "react";
import { quintileHintText } from "./helper";
import PropTypes from "prop-types";

export default function QuintileTargetTable(props) {
  const {
    quintileValues,
    quintileValuesAux,
    onQuintileChangeHandler,
    enableFillEdit,
    sumQuintiles,
    isCorrectTotal,
  } = props;

  return (
    <table
      role="table"
      className="nhsuk-table-responsive nhsuk-u-margin-bottom-4"
    >
      <caption
        className="nhsuk-table__caption"
        style={{ "padding-bottom": "16px" }}
      >
        Quintile fill target
      </caption>
      <div
        id="national-uptake"
        className={!isCorrectTotal ? "nhsuk-form-group--error" : ""}
      >
        {!isCorrectTotal && (
          <div id="quintile-error-message" className="nhsuk-error-message">
            The fill targets must add up to 100%
          </div>
        )}
        <tbody className="nhsuk-table__body">
          {Object.keys(quintileValues)
            .sort()
            .map((quintile) => {
              return (
                <tr role="row" className="nhsuk-table__row">
                  <td role="cell" className="nhsuk-table__cell ">
                    {quintileHintText(quintile)}
                  </td>
                  {enableFillEdit ? (
                    <td
                      role="cell"
                      className="nhsuk-table__cell custom-nhsuk-table__cell"
                      // style={{ "padding-left": "100px", width: "170px" }}
                    >
                      <input
                        className={
                          isCorrectTotal
                            ? "nhsuk-input"
                            : "nhsuk-input nhsuk-input--error"
                        }
                        style={{ textAlign: "center", color: "black" }}
                        type="number"
                        min="0"
                        step="1"
                        placeholder={quintileValues[`${quintile}`] + "%"}
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
                        width: "170px",
                      }}
                    >
                      {quintileValues[`${quintile}`]}%
                    </td>
                  )}
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
                {sumQuintiles(quintileValuesAux)}%
              </td>
            ) : (
              <td
                role="cell"
                className="nhsuk-table__cell"
                style={{ textAlign: "right", "padding-right": "2px" }}
              >
                {sumQuintiles(quintileValues)}%
              </td>
            )}
          </tr>
        </tbody>
      </div>
    </table>
  );
}
QuintileTargetTable.propTypes = {
  quintileValuesAux: PropTypes.number.isRequired,
  quintileValues: PropTypes.number.isRequired,
  enableFillEdit: PropTypes.bool.isRequired,
  sumQuintiles: PropTypes.func.isRequired,
  onQuintileChangeHandler: PropTypes.func.isRequired,
  isCorrectTotal: PropTypes.bool.isRequired,
};
