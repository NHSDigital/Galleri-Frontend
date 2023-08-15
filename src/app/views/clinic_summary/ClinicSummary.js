import { useState, useEffect } from "react";
import ClinicSummaryPage from './ClinicSummaryPage';
import { getIcbData, getClinicData } from '../../services/ClinicSummaryService'
import { filterClinicsByIcb } from './helper'

// Clinic Summary container
export default function ClinicSummary() {

  const [icbData, setIcbData] = useState([]);
  const [selectedIcb, setSelectedIcb] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(0);
  const [clinicList, setClinicList] = useState([]);
  const [displayClinicsNoApp, setDisplayClinicsNoApps] = useState(true);

  useEffect(() => {
    const { lastUpdated, clinicList } = getClinicData()
    setIcbData(() => getIcbData())
    setLastUpdated(() => lastUpdated)
    setClinicList(() => clinicList)
  }, [])

  useEffect(() => {
    () => filterClinicsByIcb(clinicList, selectedIcb).forEach(element => {
      console.log('--> ' + element.clinicName);
    });
    // setClinicList(() => filterClinicsByIcb(clinicList, selectedIcb))
  }, [selectedIcb])

  return (
    <div>
      <ClinicSummaryPage
        icbData={icbData}
        selectedIcb={selectedIcb}
        setSelectedIcb={setSelectedIcb}
        clinicList={clinicList}
        lastUpdated={lastUpdated}
        displayClinicsNoApp={displayClinicsNoApp} />
    </div>
  )
}
