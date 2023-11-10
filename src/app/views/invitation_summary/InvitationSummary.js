import { Component } from "react";
import axios from 'axios';

// Clinic Summary container
export default class InvitationSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <div class="nhsuk-width-container ">
        <main class="nhsuk-main-wrapper " id="clinicSummary" role="main">
          <div class="nhsuk-grid-row">
            <h1 label="header">Invitation Summary</h1>
            <div class="nhsuk-u-reading-width">

              <br />
            </div>
          </div>
        </main>
      </div>
    );
  }
}
