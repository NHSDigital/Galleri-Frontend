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
      <div>
        <dl id="summary-list" class="nhsuk-summary-list">
          <div id="" class="nhsuk-summary-list__row">
            <dt id="term1-label" class="nhsuk-summary-list__key">
              Clinic Name
            </dt>
            <dd id="" class="nhsuk-summary-list__value">
              {clinicName}
            </dd>
            <dd class="nhsuk-summary-list__actions">
              <a
                id="changeCancelButtonId"
                style={{ textDecorationLine: "underline" }}
                onClick={() => {
                  onClickChangeClinicHandler();
                }}
              >
                {cancelChangeText}
              </a>
            </dd>
          </div>

          <div id="" class="nhsuk-summary-list__row">
            <dt id="term2-label" class="nhsuk-summary-list__key">
              Address
            </dt>
            <dd id="" class="nhsuk-summary-list__value">
              {address1}
              <br />
              {address2}
              <br />
              {postcode}
            </dd>
            <dd id="" class="nhsuk-summary-list__value">
            </dd>
          </div>
        </dl>
      </div>
  );
}
