import React from "react";

export default function WeeklyCapacityTable(props) {
  const { weeklyCapacity, lastUpdated } = props;
  return (
    <div className="nhsuk-grid-row">
      <div className="nhsuk-grid-column-full">
        <table role="table" className="nhsuk-table-responsive">
          <caption className="nhsuk-table__caption">
            Clinic Weekly Capacity
            <div className="nhsuk-hint" id="last-updated-hint">
              Last Updated: {lastUpdated}
            </div>
          </caption>
          <thead role="rowgroup" className="nhsuk-table__head">
            <tr role="row">
              <th
                role="columnheader"
                className=""
                scope="col"
                style={{ whiteSpace: "pre-line" }}
              >
                Week commencing
              </th>
              {weeklyCapacity.map((date) => {
                return (
                  <th
                    style={{ fontWeight: "normal", whiteSpace: "pre" }}
                    role="columnheader"
                    className=""
                    scope="col"
                  >
                    {`${date.date.substring(0, date.date.indexOf(" 20"))}
${date.date.substring(date.date.length, date.date.indexOf(" 20"))}
              `}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="nhsuk-table__body">
            <tr role="row" className="nhsuk-table__row">
              <td
                style={{ fontWeight: "bold" }}
                role="cell"
                className="nhsuk-table__cell"
              >
                <span className="nhsuk-table-responsive__heading">
                  Week commencing{" "}
                </span>
                Appointments remaining
              </td>
              {weeklyCapacity.map((date) => {
                return (
                  <td role="cell" className="nhsuk-table__cell">
                    <span
                      style={{ fontWeight: "normal" }}
                      className="nhsuk-table-responsive__heading"
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
