import { Component } from "react";
import ClinicSummaryPage from './ClinicSummaryPage';
import { getIcbData, getClinicData } from '../../services/ClinicSummaryService'
import { filterClinicsByIcb } from './helper'

// Clinic Summary container
class ClinicSummary extends Component {
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
    console.log('mounted ' +  lastUpdated);
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

    const filteredClinicList = filterClinicsByIcb(
      clinicList, icbSelected);
    // console.log(new Date('2018-12-17T03:24:00'));
    return (
      <div>
        <ClinicSummaryPage
          icbData={icbData}
          icbSelected={icbSelected}
          onIcbChangeHandler={this.onIcbChangeHandler}
          clinicList={filteredClinicList}
          lastUpdated={lastUpdated}
          displayClinicsNoApp={displayClinicsNoApp}
          onCheckHandler={this.onCheckHandler}
        />
      </div>
    )
  }
}

export default ClinicSummary;
