import "../../styles/css/sass.css";
import React from "react";

const ClinicInfo = (props) => {
  const { clinicName, address1, address2, postcode } = props;
  const addressHolder = `
${address1}
${address2}
${postcode}`;

  return (
    <p data-testid="addressLine" style={{ whiteSpace: "pre" }}>
      <strong>{clinicName}</strong>
      {addressHolder}
    </p>
  );
};

export default ClinicInfo;
