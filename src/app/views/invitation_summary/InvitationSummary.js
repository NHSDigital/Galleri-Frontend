import React, { Component } from 'react';
import axios from 'axios';
import InvitationSummaryPage from './InvitationSummaryPage';

class InvitationSummary extends Component {
  constructor() {
    super();
    this.state = {
      "clinicList": [{ "clinicId": "", "clinicName": "" }],
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
      "displayClinicSelector": false,
      "recentInvitationHistory": {
        "dateOfPrevInv": "Not available",
        "daysSincePrevInv": "Not available",
        "invSent": 0,
        "appsRemaining": 0
      }
    }
    this.onClickChangeClinicHandler = this.onClickChangeClinicHandler.bind(this);
    this.onChangeSelectedClinicHandler = this.onChangeSelectedClinicHandler.bind(this);
  }

  calculateDaysSince(date) {
    const unixTime = Date.parse(date);
    const now = Date.now()

    const diff = now - unixTime

    return Math.floor(diff/86400000)
  }

  sortDate(weeklyArray){
    const sortedWeeklyArray = weeklyArray.map(el => {
      return Date.parse(el)
    }).sort()
    const convertSortedArrayToString = sortedWeeklyArray.map(el => {
      const date = new Date(el)
      return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    })
    return convertSortedArrayToString
  }

  onClickChangeClinicHandler() {
    const { displayClinicSelector } = this.state;
    switch (displayClinicSelector) {
      case false:
        this.setState({
          cancelChangeText: "Cancel change",
          displayClinicSelector: true
        })
        break;
      case true:
        this.setState({
          cancelChangeText: "Change clinic",
          displayClinicSelector: false
        })
        break;
    }
  }

  onChangeSelectedClinicHandler(e) {
    let currentlySelectedClinicId = "";
    let currentlySelectedClinic = "";

    const { clinicList } = this.state;

    if (e.target.value !== "") {
      clinicList.forEach(clinic => {
        if (clinic.clinicName === e.target.value) {
          currentlySelectedClinicId = clinic.clinicId;
          currentlySelectedClinic = clinic.clinicName;
        }
      })
    } else {
      currentlySelectedClinicId = "";
      currentlySelectedClinic = "";
    }

    if (currentlySelectedClinic !== "") {
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
      axios
        .get(
          `https://q8rpjf6rtg.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${currentlySelectedClinicId}&clinicName=${currentlySelectedClinic}`
        )
        .then((response) => {
          const weeklyCapacityData = response.data.WeekCommencingDate.M;
          const weeklyCapacityKeys = this.sortDate(Object.keys(response.data.WeekCommencingDate.M))
          let weeklyCapacityValue = 0
          let weeklyCapacityList = [];
          weeklyCapacityKeys.forEach((key) => {
            weeklyCapacityList.push({
              date: key,
              value: weeklyCapacityData[key].S,
            });
            weeklyCapacityValue += Number(weeklyCapacityData[key].S)
          });

          const clinicInvitationHistory = {
            dateOfPrevInv: response.data.prevInviteDate.S,
            daysSincePrevInv: this.calculateDaysSince(
              response.data.prevInviteDate.S
            ),
            invSent: response.data.invitesSent.N,
            appsRemaining: weeklyCapacityValue,
          };

          this.setState({
            clinicId: response.data.ClinicId.S,
            clinicName: response.data.ClinicName.S,
            address1: response.data.Address.S,
            address2: response.data.Address2.S,
            postcode: response.data.PostCode.S,
            weeklyCapacity: weeklyCapacityList,
            currentlySelectedClinic: e.target.value,
            cancelChangeText: "Change clinic",
            recentInvitationHistory: clinicInvitationHistory,
            displayClinicSelector: false
          })
        });
    }
  }

  componentDidMount() {
    const icbId = "Participating ICB 2"
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    axios
      .get(
        `https://q8rpjf6rtg.execute-api.eu-west-2.amazonaws.com/dev/clinic-icb-list?participatingIcb=${icbId}`
      )
      .then((response) => {
        this.setState({
          clinicList: [this.state.clinicList, ...response.data.map(clinic => {
            return { "clinicId": clinic.ClinicId.S, "clinicName": clinic.ClinicName.S }
          })]
        })
      });
  }

  render() {
    const {
      clinicList,
      clinicName,
      address1,
      address2,
      postcode,
      weeklyCapacity,
      lastUpdated,
      cancelChangeText,
      displayClinicSelector,
      recentInvitationHistory
    } = this.state
    return (
      <div>
        <InvitationSummaryPage
          clinicList={clinicList}
          clinicName={clinicName}
          address1={address1}
          address2={address2}
          postcode={postcode}
          weeklyCapacity={weeklyCapacity}
          lastUpdated={lastUpdated}
          displayClinicSelector={displayClinicSelector}
          cancelChangeText={cancelChangeText}
          recentInvitationHistory={recentInvitationHistory}
          onClickChangeClinicHandler={this.onClickChangeClinicHandler}
          onChangeSelectedClinicHandler={this.onChangeSelectedClinicHandler}
        />
      </div>
    );
  }
}

export default InvitationSummary;
