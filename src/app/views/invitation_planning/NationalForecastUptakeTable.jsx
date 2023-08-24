import React, { Component } from "react";

export default function NationalForecastUptakeTable(props) {
  const { // destructure
  } = props;
  return (
    <table role="table" class="nhsuk-table-responsive">
      <caption class="nhsuk-table__caption">
          National Forecast Uptake
        <br />
      </caption>
      <thead role="rowgroup" class="nhsuk-table__head">
        <tr role="row">
          <th role="columnheader" class="" scope="col">
            empty
          </th>
          <th role="columnheader" class="" scope="col">
            empty
          </th>
        </tr>
      </thead>
      <tbody class="nhsuk-table__body">
        {props.clinicList?.map((e, key) => {
          return (
            <tr role="row" class="nhsuk-table__row">
              <td role="cell" class="nhsuk-table__cell">
                placeholder
              </td>
              <td role="cell" class="nhsuk-table__cell">
                left placeholder
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>

  );
}
