import { Component } from "react";
import StartPage from "../start_page/StartPage";
import PrivacyConfirmationPage from "./PrivacyConfirmationPage";

export default class PrivacyConfirmation extends Component {
  constructor(props) {
    super(props);
      this.state = {
        confirmationReceived: false
      }
      this.onToggleConfirmationHandler = this.onToggleConfirmationHandler.bind(this);
  }

  onToggleConfirmationHandler(){
    this.setState({
      confirmationReceived: !confirmationReceived
    })
  }

  render() {
    return (
      <>
        {this.state.confirmationReceived ? (
          <StartPage />
          ) : (
          <PrivacyConfirmationPage onToggleConfirmationHandler={this.onToggleConfirmationHandler}/>
        )}
      </>
    );
  }
}
