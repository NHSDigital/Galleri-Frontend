"use client";
import React, { Component } from 'react';
import InvitationSummaryPage from './InvitationSummaryPage';
import { AppStateContext } from '@/app/context/AppStateContext';
import Header from "@/app/components/Header";
import axios from 'axios';

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const GENERATE_INVITES = process.env.NEXT_PUBLIC_GENERATE_INVITES;

class InvitationSummary extends Component {
  constructor() {
    super();
    this.state = {
      "displayCheckDetailsBanner": true,
      "displayErrorInvitationSummary": false,
      "displayConfirmationInvitationSummary": false,
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
      `https://${GENERATE_INVITES}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/generate-invites`,
      {
        selectedParticipants: this.context.state.personIdentifiedToInvite,
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
    // Scroll to the top of the page
    window.scrollTo(0, 0);
  }

  render() {
    const {
      displayCheckDetailsBanner,
      displayErrorInvitationSummary,
      displayConfirmationInvitationSummary,
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
          rangeSelection={rangeSelection}
          totalToInvite={totalToInvite}
          avgExpectedUptake={avgExpectedUptake}
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
