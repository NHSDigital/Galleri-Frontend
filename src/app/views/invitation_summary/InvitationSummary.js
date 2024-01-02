import React, { Component } from "react";
import InvitationSummaryPage from "./InvitationSummaryPage";
import { AppStateContext } from "@/app/context/AppStateContext";
import { setClinicDetails } from "../../helper/helperMethods";
import axios from "axios";

const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;
const GENERATE_INVITES = process.env.NEXT_PUBLIC_GENERATE_INVITES;
const CLINIC_INFORMATION = process.env.NEXT_PUBLIC_CLINIC_INFORMATION;
const GET_LSOA_IN_RANGE = process.env.NEXT_PUBLIC_GET_LSOA_IN_RANGE

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
      `https://${CLINIC_INFORMATION}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/clinic-information?clinicId=${clinicId}&clinicName=${clinicName}`
    );
    return response;
  }

  async onClickGoBackPrevPageLinkHandler() {
    const response = await this.fetchClinicInvitationHistory(
      this.context.state.clinicName,
      this.context.state.clinicId
    );
    const {
      lastSelectedRange,
      targetFillToPercentage,
      addressParts,
      firstWordAfterComma,
      weeklyCapacityList,
      clinicInvitationHistory,
      displayViewAllPrevInvitations,
    } = setClinicDetails(response);

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
      address1: addressParts[0].trim(),
      address2: firstWordAfterComma,
      postcode: response.data.PostCode.S,
      weeklyCapacity: weeklyCapacityList,
      recentInvitationHistory: clinicInvitationHistory,
      displayViewAllPrevInvitations: displayViewAllPrevInvitations,
    });

    this.context.setState({
      isSubmit: false,
    });

    axios
      .get(
        `https://${GET_LSOA_IN_RANGE}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/get-lsoa-in-range?clinicPostcode=${this.context.state.postcode}&miles=${this.context.state.rangeSelection}`
      )
      .then((response) => {
        this.context.setState({
          lsoaInRange: response.data.sort(
            (a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N
          ),
          selectedLsoa: response.data.sort(
            (a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N
          ),
        });
      });
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
    this.context.setState({
      pageSize: 10,
      currentPage: 1,
    });
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
      `https://${GENERATE_INVITES}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/generate-invites`,
      {
        selectedParticipants: this.context.state.personIdentifiedToInvite,
        clinicInfo: {
          clinicId: this.context.state.clinicId,
          clinicName: this.context.state.clinicName,
          rangeSelected: this.context.state.rangeSelection,
          targetPercentage: this.context.state.targetPercentageToFill,
          targetNoAppsToFill: this.context.state.targetAppToFill,
          appRemaining:
            this.context.state.recentInvitationHistory.appsRemaining,
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
    // Scroll to the top of the page
    window.scrollTo(0, 0);
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
