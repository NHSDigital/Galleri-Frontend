import React from "react";

export default function WeeklyCapacityTable(props) {
  const { weeklyCapacity, lastUpdated } = props;
  return (
    <div>
      <table class="nhsuk-table-responsive">
        <caption class="nhsuk-table__caption">
          Clinic Weekly Capacity
          <div class="nhsuk-hint" id="last-updated-hint">
            Last Updated: {lastUpdated}
          </div>
        </caption>
        <thead class="nhsuk-table__head">
          <tr>
            <th class="" scope="col">
              Week
              <br />
              commencing
            </th>
            {weeklyCapacity.map((date) => {
              return (
                <td class="" scope="col">
                  {date.date.substring(0, date.date.indexOf(" 20"))}
                  <br />
                  {date.date.substring(
                    date.date.length,
                    date.date.indexOf(" 20")
                  )}
                </td>
              );
            })}
          </tr>
        </thead>
        <tbody class="nhsuk-table__body nhsuk-u-font-size-16 style_tbody__YVzf_">
          <th class="" scope="col">
            Appointments
            <br />
            remaining
          </th>
          {weeklyCapacity.map((date) => {
            return (
              <td class="" scope="col">
                {date.value}
              </td>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
