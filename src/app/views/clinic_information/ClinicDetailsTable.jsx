import "../../styles/css/sass.css";
import React from "react";

export default function ClinicDetailsTable(props) {
  const {
    clinicName,
    address1,
    address2,
    postcode,
    cancelChangeText,
    onClickChangeClinicHandler,
  } = props;
  return (
    <table role="table" class="nhsuk-table-responsive">
      <thead role="rowgroup" class="nhsuk-table__head">
        <tr role="row">
          <th role="columnheader" class="" scope="col">
            Clinic Name
          </th>
          <td role="columnheader" class="" scope="col">
            {clinicName}
          </td>
          <td role="columnheader" class="" scope="col">
            <a
              style={{ textDecorationLine: "underline" }}
              onClick={() => {
                onClickChangeClinicHandler();
              }}
            >
              {cancelChangeText}
            </a>
          </td>
        </tr>
      </thead>
      <tbody class="nhsuk-table__body">
        <tr role="row" class="nhsuk-table__row">
          <th role="columnheader" class="" scope="col">
            Address
          </th>
          <td role="columnheader" class="" scope="col">
            {address1}
            <br />
            {address2}
            <br />
            {postcode}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
