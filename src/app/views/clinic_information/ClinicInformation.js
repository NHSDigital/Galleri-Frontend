import React, { Component } from 'react';
import data from '../../services/clinic_information/mockClinicInformation.json'
import ClinicSummaryPage from './ClinicInformationPage';
import { getClinicInformation } from '../../services/clinic_information/ClinicInformationService';
import axios from 'axios';
import ClinicDetail from '../../models/clinic_information/ClinicDetail';

class ClinicInformation extends Component {
  constructor() {
    super();
    this.state = {
      "clinicList": [],
      "clinicId": "",
      "clinicName": "",
      "address1": "",
      "address2": "",
      "postcode": "",
      "weeklyCapacity": [],
      "lastUpdated": "",
      "cancelChangeText": "Change clinic",
      "displayClinicSelector": false
    }
    this.onClickChangeClinicHandler = this.onClickChangeClinicHandler.bind(this);
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

  componentDidMount() {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios
      .get(
        "https://rin08iwrtl.execute-api.eu-west-2.amazonaws.com/non-prod-tf/clinic-information"
      )
      .then((response) => {

        const weeklyCapacityData = response.data.body.WeekCommencingDate.M;
        const weeklyCapacityKeys = Object.keys(response.data.body.WeekCommencingDate.M);
        let weeklyCapacityList = [];
        weeklyCapacityKeys.forEach(key => {
          weeklyCapacityList.push({"date":key, "value":weeklyCapacityData[key].S});
        })

        this.setState({
          clinicId: response.data.body.ClinicId.S,
          clinicName: response.data.body.ClinicName.S,
          address1: "clinic.address1",
          address2: "clinic.address1",
          postcode: response.data.body.PostCode.S,
          weeklyCapacity: weeklyCapacityList,
          lastUpdated: ""
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
      displayClinicSelector
    } = this.state
    console.log(this.state);
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
        />
      </div>
    );
  }
}

export default ClinicInformation;
