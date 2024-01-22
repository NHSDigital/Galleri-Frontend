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
    <table className="nhsuk-table-responsive nhsuk-u-margin-bottom-4">
      <caption className="nhsuk-table__caption nhsuk-u-margin-bottom-4">
        Quintile fill target
      </caption>
      <div
        id="quintile-fill-target"
        className={!isCorrectTotal ? "nhsuk-form-group--error" : ""}
      >
        {!isCorrectTotal && (
          <div id="quintile-error-message" className="nhsuk-error-message">
            The fill targets must add up to 100%
          </div>
        )}
        <thead>
          <tr role="row" className="nhsuk-table__row nhsuk-u-visually-hidden">
            <th role="columnheader" className="nhsuk-table__cell">
              Quintile
            </th>
            <th role="columnheader" className="nhsuk-table__cell">
              Percentage
            </th>
          </tr>
        </thead>
        <tbody className="nhsuk-table__body">
          {Object.keys(quintileValues)
            .sort()
            .map((quintile) => {
              return (
                <tr key={quintile} className="nhsuk-table__row">
                  <td className="nhsuk-table__cell ">
                    {enableFillEdit ? (
                      <label htmlFor={`quintile-${quintile}`}>
                        {quintileHintText(quintile)}
                      </label>
                    ) : (
                      <span>{quintileHintText(quintile)}</span>
                    )}
                  </td>
                  {enableFillEdit ? (
                    <td className="nhsuk-table__cell custom-nhsuk-table__cell">
                      <input
                        id={`quintile-${quintile}`}
                        className={`nhsuk-input custom-text-align-center custom-min-width ${
                          isCorrectTotal ? "" : "nhsuk-input--error"
                        }`}
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
                      id={`quintile-${quintile}`}
                      className="custom-nhsuk-table__cell_2 "
                    >
                      {quintileValues[`${quintile}`]}%
                    </td>
                  )}
                </tr>
              );
            })}
          <tr className="nhsuk-table__cell">
            <td className="nhsuk-table__cell">
              <strong>Total percentage</strong>
            </td>
            {enableFillEdit ? (
              <td className="custom-td">{sumQuintiles(quintileValuesAux)}%</td>
            ) : (
              <td className="custom-td">{sumQuintiles(quintileValues)}%</td>
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
