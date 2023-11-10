import React from "react";

export default function WeeklyCapacityTable(props) {
  const { weeklyCapacity, lastUpdated } = props;
  return (
    <div class="nhsuk-grid-row">
      <div class="nhsuk-grid-column-full">
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
              {weeklyCapacity.map((date) => {
                return (
                  <th
                    style={{ fontWeight: "normal" }}
                    role="columnheader"
                    class=""
                    scope="col"
                  >
                    {date.date.substring(0, date.date.indexOf(" 20"))}
                    <br />
                    {date.date.substring(
                      date.date.length,
                      date.date.indexOf(" 20")
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody class="nhsuk-table__body">
            <tr role="row" class="nhsuk-table__row">
              <td
                style={{ fontWeight: "bold" }}
                role="cell"
                class="nhsuk-table__cell"
              >
                <span class="nhsuk-table-responsive__heading">
                  Week commencing{" "}
                </span>
                Appointments remaining
              </td>
              {weeklyCapacity.map((date) => {
                return (
                  <td role="cell" class="nhsuk-table__cell">
                    <span
                      style={{ fontWeight: "normal" }}
                      class="nhsuk-table-responsive__heading"
                    >
                      {date.date}{" "}
                    </span>
                    {date.value}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
