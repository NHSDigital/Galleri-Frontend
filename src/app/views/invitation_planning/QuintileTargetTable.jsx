import React, { Component } from "react";

export default function QuintileTargetTable(props) {
  const {
    quintileValues,
    onQuintileChangeHandler,
    enableFillEdit
  } = props;

  const sumQuintiles = (quintileValues) => {
    return Object.values(quintileValues).reduce((acc, cur) =>
        acc + Number(cur)
    , 0)
  }

  return (
    <table role="table" class="nhsuk-table-responsive">
      <caption class="nhsuk-table__caption" style={{"padding-bottom":"16px"}}>
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
              <td role="cell" class="nhsuk-table__cell" style={{"padding-right":"2px","width":"100px"}}>
                <input class="nhsuk-input" style={{border:0,"textAlign":"right","color":"black"}}
                  type="number"
                  min="0"
                  step="1"
                  disabled = {(enableFillEdit)? "" : "disabled"}
                  placeholder={quintileValues[`${quintile}`]}
                  onChange={(e) => onQuintileChangeHandler(e, quintile)}
                  />
              </td>
              <td role="cell" class="nhsuk-table__cell" style={{"vertical-align":"middle"}}>
                <b>%</b>
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
          <td role="cell" class="nhsuk-table__cell" style={{"textAlign":"right", "padding-right":"2px"}}>
                {sumQuintiles(quintileValues)}
          </td>
          <td role="cell" class="nhsuk-table__cell" style={{"vertical-align":"middle"}}>
                <b>%</b>
              </td>
        </tr>
      </tbody>
    </table>
  );
}
