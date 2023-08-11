import { useState, useEffect } from "react";
import ClinicSummaryPage from './ClinicSummaryPage';

// Clinic Summary container
export default function ClinicSummary() {

  const [icbList, setIcbList] = useState([]);
  const [clinicData, setClinicData] = useState([]);
  const [displayClinicsNoApp, setDisplayClinicsNoApps] = useState(true);

  useEffect(() => {
    // Mock clinic list
    setIcbList([
      // can be disabled, selected
      'icb NHS.UK frontend option 1',
      'icb NHS.UK frontend option 2',
      'icb NHS.UK frontend option 3',
      'icb NHS.UK frontend option 4',
    ], [])
  })

  return (
    <div>
      <ClinicSummaryPage
        icbList={icbList}
        clinicData={clinicData}
        displayClinicsNoApp={displayClinicsNoApp} />
    </div>
  )
}
