import React, { Component } from 'react';
import ClinicSummaryPage from './ClinicInformationPage';
import { getClinicInformation } from '../../services/clinic_information/ClinicInformationService';
import axios from 'axios';
import ClinicDetail from '../../models/clinic_information/ClinicDetail';

class ClinicInformation extends Component {
  constructor() {
    super();
    this.state = {
      "clinicList": [{ "clinicId": "", "clinicName": "" }],
      "clinicId": "",
      "clinicName": "",
      "address1": "",
      "address2": "",
      "postcode": "",
      "weeklyCapacity": [],
      "lastUpdated": "",
      "cancelChangeText": "Change clinic",
      "currentlySelectedClinicId": "",
      "currentlySelectedClinic": "",
      "displayClinicSelector": false
    }
    this.onClickChangeClinicHandler = this.onClickChangeClinicHandler.bind(this);
    this.onChangeSelectedClinicHandler = this.onChangeSelectedClinicHandler.bind(this);
  }

  onClickChangeClinicHandler() {
    const { displayClinicSelector } = this.state;
    switch (displayClinicSelector) {
      case false:
        this.setState({
          cancelChangeText: "Cancel change",
          displayClinicSelector: true
        })
        break;
      case true:
        this.setState({
          cancelChangeText: "Change clinic",
          displayClinicSelector: false
        })
        break;
    }
  }

  onChangeSelectedClinicHandler(e) {
    let currentlySelectedClinicId = "";
    let currentlySelectedClinic = "";

    const { clinicList } = this.state;

    if (e.target.value !== "") {
      clinicList.forEach(clinic => {
        if (clinic.clinicName === e.target.value) {
          currentlySelectedClinicId = clinic.clinicId;
          currentlySelectedClinic = clinic.clinicName;
        }
      })
    } else {
      currentlySelectedClinicId = "";
      currentlySelectedClinic = "";
    }

    if (currentlySelectedClinic !== "") {
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      axios
        .get(
          `https://rin08iwrtl.execute-api.eu-west-2.amazonaws.com/trail/test-parameters?clinicId=${currentlySelectedClinicId}&clinicName=${currentlySelectedClinic}`
        )
        .then((response) => {

          const weeklyCapacityData = response.data.WeekCommencingDate.M;
          const weeklyCapacityKeys = Object.keys(response.data.WeekCommencingDate.M);
          let weeklyCapacityList = [];
          weeklyCapacityKeys.forEach(key => {
            weeklyCapacityList.push({ "date": key, "value": weeklyCapacityData[key].S });
          })

          this.setState({
            clinicId: response.data.ClinicId.S,
            clinicName: response.data.ClinicName.S,
            address1: response.data.Address.S,
            address2: "",
            postcode: response.data.PostCode.S,
            weeklyCapacity: weeklyCapacityList,
            currentlySelectedClinic: e.target.value
          })
          // console.log(response.data);
        });
    }
  }

  componentDidMount() {
    const icbId = "Participating ICB 1"
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
      .get(
        `https://rin08iwrtl.execute-api.eu-west-2.amazonaws.com/trail/clinic-icb-list?participatingIcb=${icbId}`
      )
      .then((response) => {
        this.setState({
          clinicList: [this.state.clinicList, ...response.data.map(clinic => {
            return { "clinicId": clinic.ClinicId.S, "clinicName": clinic.ClinicName.S }
          })],
        })
      });
  }

  render() {
    const {
      clinicList,
      clinicName,
      address1,
      address2,
      postcode,
      weeklyCapacity,
      lastUpdated,
      cancelChangeText,
      displayClinicSelector,
      currentlySelectedClinic
    } = this.state

    return (
      <div>
        <ClinicSummaryPage
          clinicList={clinicList}
          clinicName={clinicName}
          address1={address1}
          address2={address2}
          postcode={postcode}
          weeklyCapacity={weeklyCapacity}
          lastUpdated={lastUpdated}
          displayClinicSelector={displayClinicSelector}
          cancelChangeText={cancelChangeText}
          onClickChangeClinicHandler={this.onClickChangeClinicHandler}
          onChangeSelectedClinicHandler={this.onChangeSelectedClinicHandler}
        />
      </div>
    );
  }
}

export default ClinicInformation;
