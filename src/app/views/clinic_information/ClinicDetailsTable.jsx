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
    <div>
      <dl id="summary-list" className="nhsuk-summary-list">
        <div id="" className="nhsuk-summary-list__row">
          <dt id="term1-label" className="nhsuk-summary-list__key">
            Clinic Name
          </dt>
          <dd id="" className="nhsuk-summary-list__value">
            {clinicName}
          </dd>
          <dd className="nhsuk-summary-list__actions" style={{ whiteSpace: "pre" }}>
            <a
              id="changeCancelButtonId"
              className="nhsuk-link--no-visited-state"
              href=""
              // style={{ textDecorationLine: "underline" }}
              onClick={(event) => {
                event.preventDefault();
                onClickChangeClinicHandler();
              }}
            >
              {cancelChangeText}
            </a>
          </dd>
        </div>

        <div id="" className="nhsuk-summary-list__row">
          <dt id="term2-label" className="nhsuk-summary-list__key">
            Address
          </dt>
          <dd
            id=""
            className="nhsuk-summary-list__value"
            style={{ whiteSpace: "pre" }}
          >
            {addressHolder}
          </dd>
          <dd id="" className="nhsuk-summary-list__value"></dd>
        </div>
      </dl>
    </div>
  );
}
