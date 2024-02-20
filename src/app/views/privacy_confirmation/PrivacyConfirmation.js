"use client";
import { Component } from "react";
import StartPage from "../start_page/StartPage";
import PrivacyConfirmationPage from "./PrivacyConfirmationPage";
import ClinicSummary from "../clinic_summary/ClinicSummary";
import ReferralsSummary from "../referrals_summary/ReferralsSummary";

export default class PrivacyConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRoles: ["Invitation Planner", "Referring Nurse"],
      selectedRole: props.userRole,
      confirmationReceived: false,
      continueToStart: false,
    };
  }

  componentDidMount() {
    this.setState({
      continueToStart: false,
      showError: false,
    });
  }

  setContinueToStart = (value) => {
    this.setState({ continueToStart: value });
  };

  render() {
    return (
      <>
        {this.state.continueToStart ? (
          this.state.selectedRole === this.state.userRoles[0] ? ( // role 0 is 'invitation_planner'
            <ClinicSummary />
          ) : this.state.selectedRole === this.state.userRoles[1] ? ( // role 1 is 'referring_nurse'
            <ReferralsSummary />
          ) : null
        ) : (
          <PrivacyConfirmationPage continueToStart={this.setContinueToStart} />
        )}
      </>
    );
  }
}
