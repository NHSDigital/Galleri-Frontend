import React from "react";
import Pagination from "../../components/pagination";

export default function ClinicSummaryTable(props) {
  const { onCheckHandler } = props;
  console.log("props.clinicList = ", props.clinicList);
  return (
    <div>
      <table role="table" class="nhsuk-table-responsive">
        <caption class="nhsuk-table__caption">
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
          <br />
        </caption>
        <thead role="rowgroup" class="nhsuk-table__head">
          <tr role="row">
            <th role="columnheader" class="" scope="col">
              Clinic name
            </th>
            <th role="columnheader" class="" scope="col">
              Date of previous
              <br />
              invitations
            </th>
            <th role="columnheader" class="" scope="col">
              Days since previous
              <br />
              invitations generated
            </th>
            <th role="columnheader" class="" scope="col">
              Number of invitations
              <br />
              sent
            </th>
            <th role="columnheader" class="" scope="col">
              Number of appointments
              <br />
              available
            </th>
          </tr>
        </thead>
        <tbody class="nhsuk-table__body nhsuk-u-font-size-16 style_tbody__YVzf_">
          {props.clinicList?.map((e, key) => {
            return (
              <tr role="row" class="nhsuk-table__row">
                <td role="cell" class="nhsuk-table__cell">
                  {e.ClinicName?.S ? e.ClinicName?.S : "Not Available"}
                </td>
                <td role="cell" class="nhsuk-table__cell">
                  {e.PrevInviteDate?.S ? e.PrevInviteDate?.S : "Not Available"}
                </td>
                <td role="cell" class="nhsuk-table__cell">
                  {e.DaySincePrevInvite?.N !== 'NaN' ? e.DaySincePrevInvite?.N : 0}
                  </td>
                <td role="cell" class="nhsuk-table__cell">
                  {e.InvitesSent?.N}
                </td>
                <td role="cell" class="nhsuk-table__cell">
                  {e.Availability?.N}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <Pagination />
    </div>
  );
}
