import { Component } from "react";
import ClinicSummaryPage from './ClinicSummaryPage';
import { getIcbData, getClinicData } from '../../services/ClinicSummaryService'
import { filterClinicsByIcb } from './helper'

// Clinic Summary container
class ClinicSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "icbData":[],
      "icbSelected":[],
      "lastUpdated":'',
      "clinicList":[],
      "displayClinicsNoApp":true
    };
  }

  componentDidMount() {
    // API call
    const { lastUpdated, clinicList } = getClinicData()
    this.setState({
      icbData: getIcbData(),
      lastUpdated: lastUpdated,
      clinicList: clinicList
    })
  }

  render() {
    const {
      icbData,
      selectedIcb,
      setSelectedIcb,
      clinicList,
      lastUpdated,
      displayClinicsNoApp
    } = this.state;

    const filteredClinicList = filterClinicsByIcb(
      clinicList, 'Participating ICB 1')

    return (
      <div>
        {console.log('root clinic list ' + clinicList)}
        <ClinicSummaryPage
          icbData={icbData}
          selectedIcb={selectedIcb}
          setSelectedIcb={setSelectedIcb}
          clinicList={filteredClinicList}
          lastUpdated={lastUpdated}
          displayClinicsNoApp={displayClinicsNoApp} />
      </div>
    )
  }
}

export default ClinicSummary;
