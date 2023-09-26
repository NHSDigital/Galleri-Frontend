import { Component } from "react";
import ClinicSummaryPage from './ClinicSummaryPage';
import { getIcbData, getClinicData } from '../../services/ClinicSummaryService'
import { filterClinicsByIcb, filterClinicsNoAppointments } from './helper'
import axios from 'axios';

// Clinic Summary container
export default class ClinicSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "icbData": [" "],
      "icbSelected": '',
      "lastUpdated": '',
      "clinicList": [],
      "displayClinicsNoApp": false
    };

    // Handlers
    this.onIcbChangeHandler = this.onIcbChangeHandler.bind(this);
    this.onCheckHandler = this.onCheckHandler.bind(this);
  }

  getClinicsFromIcbCode() {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    axios
      .get(
        `https://d1y8vcgcs1.execute-api.eu-west-2.amazonaws.com/dev2/clinic-summary-list?participatingIcb=${this.state.icbSelected}`
      )
      .then((response) => {
        console.log(response.data)
        this.setState({
          clinicList: response.data
        })
      });
  }

  async onIcbChangeHandler(e) {
    await this.setState({
      icbSelected: e.target.value.replace('Participating ICB ', '')
    });
    console.log('icbSelected in state is = ', e.target.value)
    this.getClinicsFromIcbCode()
  }

  onCheckHandler(e) {
    this.setState({
      displayClinicsNoApp: e.target.checked
    })
  }

  componentDidMount() {
    // API call https://d1y8vcgcs1.execute-api.eu-west-2.amazonaws.com/dev/participating-icb-list
    const { lastUpdated, clinicList } = getClinicData()

    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    axios
      .get(
        `https://d1y8vcgcs1.execute-api.eu-west-2.amazonaws.com/dev/participating-icb-list`
      )
      .then((response) => {
        this.setState({
          icbData: [...this.state.icbData, ...response.data],
          lastUpdated: lastUpdated,
          clinicList: clinicList
        })
      });
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
