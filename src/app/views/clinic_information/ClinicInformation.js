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
      "clinicList":[],
      "clinicId": "",
      "clinicName": "",
      "address1": "",
      "address2": "",
      "postcode": "",
      "weeklyCapacity": [],
      "cancelChangeText": "Change clinic",
      "displayClinicSelector": false
    }

    this.onClickChangeClinicHandler = this.onClickChangeClinicHandler.bind(this);
  }

  onClickChangeClinicHandler() {
    const {displayClinicSelector} = this.state;
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

    // axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // axios
    //   .get(
    //     "https://rin08iwrtl.execute-api.eu-west-2.amazonaws.com/non-prod-tf/clinic-information"
    //   )
    //   .then((response) => {
    //     console.log(response.data.body);
    //     this.setState({
    //       clinicId: clinic.clinicId,
    //       clinicName: clinic.clinicName,
    //       address1: clinic.address1,
    //       address2: clinic.address1,
    //       postcode: clinic.postcode,
    //       weeklyCapacity: clinic.weeklyCapacity
    //     })

    //   });

    const clinicOne = data[0];
    const clinicTwo = data[1];

    this.setState({
      clinicList: data,
      clinicId: clinicOne.clinicId,
      clinicName: clinicOne.clinicName,
      address1: clinicOne.address1,
      address2: clinicOne.address1,
      postcode: clinicOne.postcode,
      weeklyCapacity: clinicOne.weeklyCapacity
    })
  }

  render() {
    console.log(this.state);
    const {
      clinicList,
      clinicName,
      address1,
      address2,
      postcode,
      weeklyCapacity,
      cancelChangeText,
      displayClinicSelector
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
          displayClinicSelector={displayClinicSelector}
          cancelChangeText={cancelChangeText}
          onClickChangeClinicHandler={this.onClickChangeClinicHandler}
        />
      </div>
    );
  }
}

export default ClinicInformation;
