import React, { Component } from 'react';
import InvitationSummaryPage from './InvitationSummaryPage';

class InvitationSummary extends Component {
  constructor() {
    super();
    this.state = {
      "displayCheckDetailsBanner": true,
      "displayErrorInvitationSummary": false,
      "displayConfirmationInvitationSummary": false,
      // Using the mock data below as placeholders for now until the Router is implemented to bring these values from previous pages
      "dummySummaryList": {
        "clinicDistanceHolder": "+ 5 miles",
        "availableInvitationsHolder": "4,372",
        "remainingAppointmentsHolder": "240",
        "targetFillPercentageHolder": "50 %",
        "targetAppointmentsToFillHolder": "120",
        "expectedUptakeRateHolder": "24 %",
        "invitationsToGenerateHolder": "500", // Change this to "0" to trigger the Error Scenario
      }

    }
    this.onClickGenerateHandler = this.onClickGenerateHandler.bind(this);
  }

  scrollToMainContent() {
    const mainContent = document.getElementById('header');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onClickGenerateHandler() {
    this.setState({
      displayConfirmationInvitationSummary: true,
      displayCheckDetailsBanner: false
    });
    this.scrollToMainContent();

  }

  componentDidMount() {
    if (this.state.dummySummaryList.invitationsToGenerateHolder === "0") {
      this.setState({
        displayErrorInvitationSummary: true,
        displayCheckDetailsBanner: false
      })
    }
  }

  render() {
    const {
      displayCheckDetailsBanner,
      displayErrorInvitationSummary,
      displayConfirmationInvitationSummary,
      dummySummaryList
    } = this.state
    return (
      <div>
        <InvitationSummaryPage
          displayCheckDetailsBanner={displayCheckDetailsBanner}
          displayErrorInvitationSummary={displayErrorInvitationSummary}
          displayConfirmationInvitationSummary={displayConfirmationInvitationSummary}
          dummySummaryList={dummySummaryList}
          onClickGenerateHandler={this.onClickGenerateHandler}
        />
      </div>
    );
  }
}

export default InvitationSummary;
