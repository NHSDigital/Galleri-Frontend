import React from 'react';

export const AppStateContext = React.createContext();

export const AppStateConsumer = AppStateContext.Consumer;

export class AppStateProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "icbData": [" "],
      "icbSelected": '',
      "clinicIdSelected": "",
      "clinicNameSelected": "",
      "lastUpdated": '',
      "clinicList": [],
      "displayClinicsNoApp": false,
      "navigateToClinic": false,
      "clinicIdNameList": [{ "clinicId": "", "clinicName": "" }],
      "clinicId": "",
      "clinicName": "",
      "address1": "",
      "address2": "",
      "postcode": "",
      "weeklyCapacity": [],
      "lastUpdated": "14 July 2024, 1.00am",
      "cancelChangeText": "Change clinic",
      "currentlySelectedClinicId": "",
      "currentlySelectedClinic": "",
      "participatingICBSelected": "",
      "displayClinicSelector": false,
      "displayViewAllPrevInvitations": false,
      "recentInvitationHistory": {
        "dateOfPrevInv": "Not available",
        "daysSincePrevInv": "Not available",
        "invSent": 0,
        "appsRemaining": 0,
        "isSubmit": false
      },
      "rangeSelection": 1,
      "targetAppToFill": 0,
      "targetPercentageToFill": 0,
      "totalToInvite": 0,
      "avgExpectedUptake": 0
    };
  }

  render() {
    return (
      <AppStateContext.Provider
        value={{
          state: this.state,
          setState: this.setState.bind(this), // Bind to access in class methods
        }}
      >
        {this.props.children}
      </AppStateContext.Provider>
    );
  }
}
