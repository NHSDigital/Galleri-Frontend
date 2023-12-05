import React, { Component } from "react";
import InvitationSummaryPage from "./InvitationSummaryPage";
import { AppStateContext } from "@/app/context/AppStateContext";
import { sortDate, calculateDaysSince } from "../../helper/helperMethods";
import axios from "axios";

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const GENERATE_INVITES = process.env.NEXT_PUBLIC_GENERATE_INVITES;

class InvitationSummary extends Component {
  constructor() {
    super();
    this.state = {
      displayCheckDetailsBanner: true,
      displayErrorInvitationSummary: false,
      displayConfirmationInvitationSummary: false,
    };
    this.onClickGenerateHandler = this.onClickGenerateHandler.bind(this);
    this.onClickGoBackPrevPageLinkHandler =
      this.onClickGoBackPrevPageLinkHandler.bind(this);
  }

  async fetchClinicInvitationHistory(clinicName, clinicId) {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    const response = await axios.get(
      `https://nuw7pl0ajk.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${clinicId}&clinicName=${clinicName}`
    );
    return response;
  }

  setClinicDetails(response) {
    const weeklyCapacityData = response.data.WeekCommencingDate.M;
    const weeklyCapacityKeys = sortDate(
      Object.keys(response.data.WeekCommencingDate.M)
    );
    let weeklyCapacityValue = 0;
    let weeklyCapacityList = [];
    weeklyCapacityKeys.forEach((key) => {
      weeklyCapacityList.push({
        date: key,
        value: weeklyCapacityData[key].N,
      });
      weeklyCapacityValue += Number(weeklyCapacityData[key].N);
    });

    const prevInviteDate = response.data.PrevInviteDate.S;
    const dateOfPrevInv = prevInviteDate ? prevInviteDate : "Not Available";
    const daysSincePrevInv = prevInviteDate
      ? calculateDaysSince(prevInviteDate)
      : "Not Available";

    const clinicInvitationHistory = {
      dateOfPrevInv,
      daysSincePrevInv,
      invSent: response.data.InvitesSent.N,
      appsRemaining: weeklyCapacityValue,
    };

    const addressParts = response.data.Address.S.split(",");
    const [firstWordAfterComma] = addressParts[1].trim().split(" ");
    const displayViewAllPrevInvitations = prevInviteDate ? true : false;

    const lastSelectedRange = response.data.LastSelectedRange.N;
    const targetFillToPercentage = response.data.TargetFillToPercentage.N;

    // Set component state
    this.setState({
      rangeSelection: lastSelectedRange,
      targetFillToInputValue: targetFillToPercentage,
      appsToFill: Math.floor(
        this.context.state.recentInvitationHistory.appsRemaining *
          (this.state.targetFillToInputValue / 100)
      ),
    });

    // Set global state
    this.context.setState({
      clinicId: response.data.ClinicId.S,
      clinicName: response.data.ClinicName.S,
      // address1: response.data.Address.S,
      address1: addressParts[0].trim(),
      address2: firstWordAfterComma,
      postcode: response.data.PostCode.S,
      weeklyCapacity: weeklyCapacityList,
      recentInvitationHistory: clinicInvitationHistory,
      displayViewAllPrevInvitations: displayViewAllPrevInvitations,
    });
  }

  async onClickGoBackPrevPageLinkHandler() {
    this.context.state.clinicName, this.context.state.clinicId;
    const response = await this.fetchClinicInvitationHistory(
      this.context.state.clinicName,
      this.context.state.clinicId
    );
    this.setClinicDetails(response);

    this.context.setState({
      isSubmit: false,
    });

    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
  }

  scrollToMainContent() {
    const mainContent = document.getElementById("header");
    if (mainContent) {
      mainContent.scrollIntoView({ behavior: "smooth" });
    }
  }

  async onClickGenerateHandler() {
    this.setState({
      displayConfirmationInvitationSummary: true,
      displayCheckDetailsBanner: false,
    });
    this.scrollToMainContent();

    const response = await axios.post(
      // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
      `https://ef78n7akx6.execute-api.eu-west-2.amazonaws.com/dev/generate-invites`,
      {
        selectedParticipants: this.context.state.personIdentifiedToInvite,
        clinicInfo: {
          clinicId: this.context.state.clinicId,
          clinicName: this.context.state.clinicName,
          rangeSelected: this.context.state.rangeSelection,
          targetPercentage: this.context.state.targetPercentageToFill,
        },
      }
    );
    console.log("logging response = ", response.data);
  }

  componentDidMount() {
    if (this.context.state.totalToInvite === 0) {
      this.setState({
        displayErrorInvitationSummary: true,
        displayCheckDetailsBanner: false,
      });
    }
  }

  render() {
    const {
      displayCheckDetailsBanner,
      displayErrorInvitationSummary,
      displayConfirmationInvitationSummary,
    } = this.state;

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
      noInviteToGenerate,
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
          displayConfirmationInvitationSummary={
            displayConfirmationInvitationSummary
          }
          rangeSelection={rangeSelection}
          totalToInvite={totalToInvite}
          avgExpectedUptake={avgExpectedUptake}
          targetAppToFill={targetAppToFill}
          targetPercentageToFill={targetPercentageToFill}
          noInviteToGenerate={noInviteToGenerate}
          onClickGenerateHandler={this.onClickGenerateHandler}
          onClickGoBackPrevPageLinkHandler={
            this.onClickGoBackPrevPageLinkHandler
          }
        />
      </div>
    );
  }
}

export default InvitationSummary;
InvitationSummary.contextType = AppStateContext;
