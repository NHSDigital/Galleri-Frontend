import { Component } from "react";
import ClinicSummaryPage from './ClinicSummaryPage';
import { getIcbData, getClinicData } from '../../services/ClinicSummaryService'
import { filterClinicsByIcb, filterClinicsNoAppointments } from './helper'

// Clinic Summary container
export default class ClinicSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "icbData": [],
      "icbSelected": '',
      "lastUpdated": '',
      "clinicList": [],
      "displayClinicsNoApp": false
    };

    // Handlers
    this.onIcbChangeHandler = this.onIcbChangeHandler.bind(this);
    this.onCheckHandler = this.onCheckHandler.bind(this);
  }

  onIcbChangeHandler(e) {
    this.setState({
      icbSelected: e.target.value
    });
  }

  onCheckHandler(e) {
    this.setState({
      displayClinicsNoApp: e.target.checked
    })
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
      icbSelected,
      clinicList,
      lastUpdated,
      displayClinicsNoApp
    } = this.state;

    let filteredClinicList = filterClinicsByIcb(
      clinicList, icbSelected, displayClinicsNoApp);

    let filterClinicListApps = filterClinicsNoAppointments(filteredClinicList, displayClinicsNoApp)
    return (
      <div>
        <ClinicSummaryPage
          icbData={icbData}
          icbSelected={icbSelected}
          clinicList={filterClinicListApps}
          lastUpdated={lastUpdated}
          displayClinicsNoApp={displayClinicsNoApp}
          onIcbChangeHandler={this.onIcbChangeHandler}
          onCheckHandler={this.onCheckHandler}
        />
      </div>
    )
  }
}