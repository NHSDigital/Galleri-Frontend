import React, { Component } from "react";

export default class ClinicSummaryTable extends Component {
  render() {
    const { clinicList, lastUpdated } = this.props.clinicData;
    return (
      <table role="table" class="nhsuk-table-responsive">
        <caption class="nhsuk-table__caption">
          Clinic List
          <div class="nhsuk-hint" id="last-updated-hint">
            Last Updated: {lastUpdated}
          </div>
          <div class="nhsuk-checkboxes__item">
            <input
              class="nhsuk-checkboxes__input"
              id="displayClinicsNoApp"
              name="DisplayClinicsWithNoAppointmentsAvailable"
              type="checkbox"
              value=""
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
              invitations
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
        <tbody class="nhsuk-table__body">
          <tr role="row" class="nhsuk-table__row">
            <td role="cell" class="nhsuk-table__cell">
              <span class="nhsuk-table-responsive__heading">Age </span>7 to 9
              years
            </td>
            <td role="cell" class="nhsuk-table__cell">
              <span class="nhsuk-table-responsive__heading">How much? </span>
              200mg
            </td>
            <td role="cell" class="nhsuk-table__cell">
              <span class="nhsuk-table-responsive__heading">How often? </span>
              Max 3 times in 24 hours
            </td>
            <td role="cell" class="nhsuk-table__cell">
              <span class="nhsuk-table-responsive__heading">How often? </span>
              Max 3 times in 24 hours
            </td>
            <td role="cell" class="nhsuk-table__cell">
              <span class="nhsuk-table-responsive__heading">How often? </span>
              Max 3 times in 24 hours
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
