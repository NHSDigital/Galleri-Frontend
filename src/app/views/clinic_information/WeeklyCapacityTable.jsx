import React from "react";
import Pagination from "../../components/pagination";

export default function WeeklyCapacityTable(props) {
  const { weeklyCapacity, lastUpdated } = props;
  return (
    <div>
      <table role="table" class="nhsuk-table-responsive">
        <caption class="nhsuk-table__caption">
          Clinic Weekly Capacity
          <div class="nhsuk-hint" id="last-updated-hint">
            Last Updated: {lastUpdated}
          </div>
        </caption>
        <thead role="rowgroup" class="nhsuk-table__head">
          <tr role="row">
            <th role="columnheader" class="" scope="col">
              Week
              <br />
              commencing
            </th>
            <td role="columnheader" class="" scope="col">
              14 July
              <br />
              2024
            </td>
            <td role="columnheader" class="" scope="col">
              21 July
              <br />
              2024
            </td>
            <td role="columnheader" class="" scope="col">
              28 July
              <br />
              2024
            </td>
          </tr>
        </thead>
        <tbody class="nhsuk-table__body nhsuk-u-font-size-16 style_tbody__YVzf_">
          <th role="columnheader" class="" scope="col">
            Appointments
            <br />
            remaining
          </th>
          <td role="columnheader" class="" scope="col">
            0
          </td>
          <td role="columnheader" class="" scope="col">
            0
          </td>
        </tbody>
      </table>
    </div>
  );
}
