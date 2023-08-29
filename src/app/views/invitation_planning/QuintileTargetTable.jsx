import React, { Component } from "react";

export default function QuintileTargetTable(props) {
  const {
    quintileValues,
    onQuintileChangeHandler,
    enableFillEdit
  } = props;


  const handleChange = (e, quintile) => {
    quintileValues[`${quintile}`]
  }

  const sumQuintiles = (quintileValues) => {
    return Object.values(quintileValues).reduce((acc, cur) =>
        acc + Number(cur)
    , 0)
  }

  return (
    <table role="table" class="nhsuk-table-responsive">
      <caption class="nhsuk-table__caption">
          Quintile fill target
        <br />
      </caption>
      <tbody class="nhsuk-table__body">
        {Object.keys(quintileValues).sort().map( quintile => {
          return (
            <tr role="row" class="nhsuk-table__row">
              <td role="cell" class="nhsuk-table__cell">
                {`${quintile}`}
              </td>
              <td role="cell" class="nhsuk-table__cell">
                <input class="nhsuk-search__input"
                  type="number"
                  min="0"
                  step="1"
                  disabled = {(enableFillEdit)? "" : "disabled"}
                  placeholder={quintileValues[`${quintile}`]}
                  onChange={(e) => onQuintileChangeHandler(e, quintile)}
                  />
                  %
              </td>
            </tr>
          );
        }
        )}
        <tr role="cell" class="nhsuk-table__cell">
          <td role="cell" class="nhsuk-table__cell">
              <b>
                Total percentage
              </b>
          </td>
          <td role="cell" class="nhsuk-table__cell">
                {sumQuintiles(quintileValues)} %
          </td>
        </tr>
      </tbody>
    </table>
  );
}
