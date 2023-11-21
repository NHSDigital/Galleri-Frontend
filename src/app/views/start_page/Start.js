import React, { Component } from 'react';
import StartPage from './StartPage';
import ClinicSummary from '../clinic_summary/ClinicSummary';

class Start extends Component {
  constructor() {
    super();
    this.state = {
      "isStart": false,
    }
    this.onClickStartHandler = this.onClickStartHandler.bind(this);

  }

  onClickStartHandler() {
    this.setState({ "isStart": true })
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
  }


  componentDidMount() {
  }

  render() {
    return (
      <div>
        {!this.state.isStart ? (
          <StartPage
            onClickStartHandler={this.onClickStartHandler} />
        ) : (
          <ClinicSummary />
        )
        }
      </div>
    );
  }
}

export default Start;
