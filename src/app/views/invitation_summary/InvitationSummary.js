import React, { Component } from 'react';
import InvitationSummaryPage from './InvitationSummaryPage';
import { AppStateContext } from '@/app/context/AppStateContext';
import Header from "@/app/components/Header";
import axios from 'axios';

class InvitationSummary extends Component {
  constructor() {
    super();
    this.state = {
      "displayCheckDetailsBanner": true,
      "displayErrorInvitationSummary": false,
      "displayConfirmationInvitationSummary": false,
      // Using the mock data (values inside " ") as some of components missing like LSOA Table form where the values are brought over
      "dummySummaryList": {
        "availableInvitationsHolder": `"958"`,//Context API from Clinic Invitation Page
        "remainingAppointmentsHolder": `"240"`, //Context API from Clinic Invitation Page
        "targetFillPercentageHolder": `"50 %"`,//Context API from Clinic Invitation Page
        "targetAppointmentsToFillHolder": `"120"`,//Context API from Clinic Invitation Page
        "expectedUptakeRateHolder": `"24 %"`, //Context API from ??
        "invitationsToGenerateHolder": `"500"`, // From calculation done in Clinic Invitation Page, Change this to "0" to trigger the Error Scenario
      }

    }
    this.onClickGenerateHandler = this.onClickGenerateHandler.bind(this);
    this.onClickGoBackPrevPageLinkHandler = this.onClickGoBackPrevPageLinkHandler.bind(this);
  }

  onClickGoBackPrevPageLinkHandler() {
    this.context.setState({ "isSubmit": false })
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
  }

  scrollToMainContent() {
    const mainContent = document.getElementById('header');
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async onClickGenerateHandler() {
    this.setState({
      displayConfirmationInvitationSummary: true,
      displayCheckDetailsBanner: false
    });
    this.scrollToMainContent();

    const response = await axios.post(
      // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
      "https://rznf4a3flh.execute-api.eu-west-2.amazonaws.com/dev/generate-invites",
      { selectedParticipants: this.context.state.personIdentifiedToInvite,
        clinicInfo: {
          clinicId: this.context.state.clinicId,
          clinicName: this.context.state.clinicName,
          rangeSelected: this.context.state.rangeSelection,
          targetPercentage: this.context.state.targetPercentageToFill
        }
      }
    );
    console.log("logging response = ", response.data)
  }

  componentDidMount() {
    if (this.context.state.totalToInvite === 0) {
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

    // Add the context state variables you want to pass onto this page, and pass it as props on Return block below
    const {
      clinicName,
      address1,
      address2,
      postcode,
      recentInvitationHistory,
      rangeSelection,
      targetAppToFill,
      targetPercentageToFill,
      totalToInvite,
      avgExpectedUptake,
      noInviteToGenerate
    } = this.context.state;
    return (
      <div>
        <InvitationSummaryPage
          clinicName={clinicName}
          address1={address1}
          address2={address2}
          postcode={postcode}
          recentInvitationHistory={recentInvitationHistory}
          displayCheckDetailsBanner={displayCheckDetailsBanner}
          displayErrorInvitationSummary={displayErrorInvitationSummary}
          displayConfirmationInvitationSummary={displayConfirmationInvitationSummary}
          dummySummaryList={dummySummaryList}
          rangeSelection={rangeSelection}
          totalToInvite = {totalToInvite}
          avgExpectedUptake = {avgExpectedUptake}
          targetAppToFill={targetAppToFill}
          targetPercentageToFill={targetPercentageToFill}
          noInviteToGenerate={noInviteToGenerate}
          onClickGenerateHandler={this.onClickGenerateHandler}
          onClickGoBackPrevPageLinkHandler={this.onClickGoBackPrevPageLinkHandler}
        />
      </div>
    );
  }
}

export default InvitationSummary;
InvitationSummary.contextType = AppStateContext;
