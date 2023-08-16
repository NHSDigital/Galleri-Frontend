import { Component } from "react";
import ClinicSummaryPage from './InvitationPlanningPage';
import { getIcbData, getClinicData } from '../../services/ClinicSummaryService'
import { filterClinicsByIcb } from './helper'

// Invitation Planning container
class InvitationPlanning extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    // Handlers
    // this.onIcbChangeHandler = this.onIcbChangeHandler.bind(this);
    // this.onCheckHandler = this.onCheckHandler.bind(this);
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

    const filteredClinicList = filterClinicsByIcb(
      clinicList, icbSelected);
    console.log('apps? ' + displayClinicsNoApp);
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
