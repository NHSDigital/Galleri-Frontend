import { Component } from "react";
import StartPage from "../start_page/StartPage";
import PrivacyConfirmationPage from "./PrivacyConfirmationPage";

export default class PrivacyConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmationReceived: false,
      continueToStart: false,
      showError: false
    }
    this.onToggleConfirmationHandler = this.onToggleConfirmationHandler.bind(this);
    this.onClickContinueHandler = this.onClickContinueHandler.bind(this);
  }

  onToggleConfirmationHandler() {
    this.setState({
      confirmationReceived: !this.state.confirmationReceived
    })
  }

  onClickContinueHandler() {
    if (this.state.confirmationReceived) {
      this.setState({
        continueToStart: true
      })
    } else {
      this.setState({
        showError: true
      })
    }
  }

  componentDidMount() {
    this.setState({
      continueToStart: false,
      showError: false
    })
  }

  render() {
    return (
      <>
        {this.state.continueToStart ? (
          <StartPage />
        ) : (
          <PrivacyConfirmationPage
            onToggleConfirmationHandler={this.onToggleConfirmationHandler}
            onClickContinueHandler={this.onClickContinueHandler}
            showError={this.state.showError}
          />
        )}
      </>
    );
  }
}
