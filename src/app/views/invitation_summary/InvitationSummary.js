import React, { Component } from 'react';
import axios from 'axios';
import InvitationSummaryPage from './InvitationSummaryPage';

class InvitationSummary extends Component {
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
      "lastUpdated": "14 July 2024, 1.00am",
      "cancelChangeText": "Change clinic",
      "currentlySelectedClinicId": "",
      "currentlySelectedClinic": "",
      "displayClinicSelector": false,
      "displayCheckDetailsBanner": true,
      "displayErrorInvitationSummary": false,
      "displayConfirmationInvitationSummary": false,
      "recentInvitationHistory": {
        "dateOfPrevInv": "Not available",
        "daysSincePrevInv": "Not available",
        "invSent": 0,
        "appsRemaining": 0
      },
      "dummySummaryList": {
      "clinicDistanceHolder": "+ 5 miles",
      "availableInvitationsHolder": "4,372",
      "remainingAppointmentsHolder": "240",
      "targetFillPercentageHolder": "50 %",
      "targetAppointmentsToFillHolder": "120",
      "expectedUptakeRateHolder": "24 %",
      "invitationsToGenerateHolder": "0",
      }

    }
    this.onClickGenerateHandler = this.onClickGenerateHandler.bind(this);
  }


  onClickGenerateHandler() {
    this.setState({
      displayConfirmationInvitationSummary: true,
      displayCheckDetailsBanner: false
    })

  }

  componentDidMount() {
    if (this.state.dummySummaryList.invitationsToGenerateHolder === "0" ) {
      this.setState({
        displayErrorInvitationSummary: true,
        displayCheckDetailsBanner: false
      })
    }
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
      displayCheckDetailsBanner,
      displayErrorInvitationSummary,
      displayConfirmationInvitationSummary,
      recentInvitationHistory,
      dummySummaryList
    } = this.state
    return (
      <div>
        <InvitationSummaryPage
          clinicList={clinicList}
          clinicName={clinicName}
          address1={address1}
          address2={address2}
          postcode={postcode}
          weeklyCapacity={weeklyCapacity}
          lastUpdated={lastUpdated}
          displayClinicSelector={displayClinicSelector}
          displayCheckDetailsBanner={displayCheckDetailsBanner}
          displayErrorInvitationSummary={displayErrorInvitationSummary}
          displayConfirmationInvitationSummary={displayConfirmationInvitationSummary}
          cancelChangeText={cancelChangeText}
          recentInvitationHistory={recentInvitationHistory}
          dummySummaryList={dummySummaryList}
          onClickGenerateHandler={this.onClickGenerateHandler}
        />
      </div>
    );
  }
}

export default InvitationSummary;
