import React, { Component } from "react";

export default function QuintileTargetTable(props) {
  const {
    quintileValues,
    // enableFillEdit
  } = props;

  // console.log('enableFillEdit = ', enableFillEdit)

  const handleChange = (e, quintile) => {
    console.log('before', quintileValues)
    quintileValues[`${quintile}`]
  }

  const a = false
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
                  disabled = {(a)? "disabled" : ""}
                  placeholder={quintileValues[`${quintile}`]}
                  onChange={(e) => handleChange(e, quintile)}
                  />
              </td>
            </tr>
          );
        }
        )}
      </tbody>
    </table>

  );
}
