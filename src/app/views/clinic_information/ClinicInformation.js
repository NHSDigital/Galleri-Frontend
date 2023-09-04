import React, { Component } from 'react';
import data from '../../services/clinic_information/mockClinicInformation.json'
import ClinicSummaryPage from './ClinicInformationPage';
import { getClinicInformation } from '@/app/services/clinic_information/ClinicInformationService';

class ClinicInformation extends Component {
  constructor(){
    super();

    this.state = {
      "clinicId":"",
      "clinicName":"",
      "address":"",
      "postcode":"",
      "weeklyCapacity":[]
    }
  }

  componentDidMount(){
    // const res =  getClinicInformation("0001", "Phlebotomy site 5");
    // res.then(r => {
    //   console.log(r);
    // }).catch(error => {
    //   console.log(error);
    // })
  }

  render() {
    return (
      <div>
        <ClinicSummaryPage />
      </div>
    );
  }
}

export default ClinicInformation;
