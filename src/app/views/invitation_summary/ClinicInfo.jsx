import "../../styles/css/sass.css";
import React from 'react';

const ClinicInfo = () => {
  const clinicNameHolder = 'Phlebotomy clinic 5';
  const addressHolder = `
    West Hospital
    Big Town
    RG14 4RH
  `;

  return (
    <p style={{ whiteSpace: 'pre' }}>
      <strong>{clinicNameHolder}</strong>
      {addressHolder}
    </p>
  );
};

export default ClinicInfo;
