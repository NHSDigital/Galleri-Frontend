import "../../styles/css/sass.css";
import React from "react";

const ClinicInfo = (props) => {
  const { clinicName, address1, address2, postcode } = props;
  const fullAddress = `
${address1}
${address2}
${postcode}`;

  return (
    <address
      aria-label="Clinic Information"
      data-testid="addressLine"
      className="custom-pre__whitespace"
    >
      <strong id="clinicNameLabel">{clinicName}</strong>
      {fullAddress}
    </address>
  );
};

export default ClinicInfo;
