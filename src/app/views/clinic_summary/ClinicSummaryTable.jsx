import "../../styles/css/sass.css";
import React from "react";
import Pagination from "../../components/pagination";

export default function ClinicSummaryTable(props) {
  const { onCheckHandler, onClickClinicHandler } = props;

  return (
    <div>
      <table
        role="table"
        class="nhsuk-table-responsive nhsuk-u-margin-bottom-6"
      >
        <caption class="nhsuk-table__caption nhsuk-u-margin-bottom-4">
          Clinic List
          <div class="nhsuk-hint" id="last-updated-hint">
            Last Updated: {props.lastUpdated}
          </div>
          <div class="nhsuk-checkboxes__item">
            <input
              class="nhsuk-checkboxes__input"
              id="displayClinicsNoApp"
              name="DisplayClinicsWithNoAppointmentsAvailable"
              type="checkbox"
              value=""
              onChange={(e) => onCheckHandler(e)}
            />
            <label
              class="nhsuk-label nhsuk-checkboxes__label"
              for="displayClinicsNoApp"
            >
              Display clinics with no appointments available
            </label>
          </div>
        </caption>
        <thead role="rowgroup" class="nhsuk-table__head">
          <tr role="row">
            <th
              role="columnheader"
              class=""
              scope="col"
              style={{ "vertical-align": "bottom" }}
            >
              Clinic name
            </th>
            <th
              role="columnheader"
              class=""
              scope="col"
              style={{ whiteSpace: "pre-line", "vertical-align": "bottom" }}
            >
              Date of previous invitations
            </th>
            <th
              role="columnheader"
              class=""
              scope="col"
              style={{ whiteSpace: "pre-line" }}
            >
              Days since previous invitations
            </th>
            <th
              role="columnheader"
              class=""
              scope="col"
              style={{ whiteSpace: "pre-line" }}
            >
              Invitations sent
            </th>
            <th
              role="columnheader"
              class=""
              scope="col"
              style={{ whiteSpace: "pre-line" }}
            >
              Appointments available
            </th>
          </tr>
        </thead>
        <tbody class="nhsuk-table__body nhsuk-u-font-size-16">
          {props.clinicList
            .sort((a, b) => {
              return (
                Number(b.DaySincePrevInvite.N) - Number(a.DaySincePrevInvite.N)
              );
            })
            ?.map((e, key) => {
              return (
                <tr role="row" class="nhsuk-table__row">
                  <td
                    role="cell"
                    class="nhsuk-table__cell"
                    style={{ whiteSpace: "pre" }}
                  >
                    <span class="nhsuk-table-responsive__heading">
                      Clinic name{" "}
                    </span>
                    <a
                      id={e.ClinicName.S}
                      className="nhsuk-link--no-visited-state"
                      href="#"
                      onClick={(event) => {
                        onClickClinicHandler(event, e);
                      }}
                    >
                      {e.ClinicName?.S ? e.ClinicName?.S : "Not Available"}
                    </a>
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    <span class="nhsuk-table-responsive__heading">
                      Date of previous invitations{" "}
                    </span>
                    {e.PrevInviteDate?.S
                      ? e.PrevInviteDate?.S
                      : "Not Available"}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    <span class="nhsuk-table-responsive__heading">
                      Days since previous invitations{" "}
                    </span>
                    {e.DaySincePrevInvite?.N !== "NaN"
                      ? e.DaySincePrevInvite?.N
                      : 0}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    <span class="nhsuk-table-responsive__heading">
                      Number of invitations sent{" "}
                    </span>
                    {e.InvitesSent?.N}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    <span class="nhsuk-table-responsive__heading">
                      Number of appointments available{" "}
                    </span>
                    {e.Availability?.N}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
