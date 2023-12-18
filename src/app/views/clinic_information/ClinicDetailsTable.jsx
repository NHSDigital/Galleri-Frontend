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

  const addressHolder = `${address1}
${address2}
${postcode}`;
  return (
    <section>
      <dl id="clinic-information-summary-list" className="nhsuk-summary-list custom-border-bottom">
        <div className="nhsuk-summary-list__row">
          <dt id="clinic-name-label" className="nhsuk-summary-list__key">
            Clinic Name
          </dt>
          <dd id="clinicName" className="nhsuk-summary-list__value">
            {clinicName}
          </dd>
          <dd className="nhsuk-summary-list__actions custom-pre__whitespace">
            <a
              id="changeCancelButtonId"
              className="nhsuk-link--no-visited-state"
              href=""
              onClick={(event) => {
                event.preventDefault();
                onClickChangeClinicHandler();
              }}
            >
              {cancelChangeText}
            </a>
          </dd>
        </div>

        <div className="nhsuk-summary-list__row">
          <dt id="clinic-address-label" className="nhsuk-summary-list__key custom-no-border">
            Address
          </dt>
          <dd
            id="clinic-address"
            className="nhsuk-summary-list__value custom-pre__whitespace custom-no-border"
          >
            {addressHolder}
          </dd>
        </div>
      </dl>
    </section>
  );
}
