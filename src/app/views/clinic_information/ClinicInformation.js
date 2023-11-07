import React, { Component } from 'react';
import ClinicInformationPage from "./ClinicInformationPage";
import axios from 'axios';


class ClinicInformation extends Component {
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
      "displayUserErrorTargetPercentage": false,
      "displayViewAllPrevInvitations": false,
      "targetFillToInputValue": 0,
      "appsToFill": 0,
      "recentInvitationHistory": {
        "dateOfPrevInv": "Not available",
        "daysSincePrevInv": "Not available",
        "invSent": 0,
        "appsRemaining": 0
      },
    }

    this.onClickChangeClinicHandler = this.onClickChangeClinicHandler.bind(this);
    this.onChangeSelectedClinicHandler = this.onChangeSelectedClinicHandler.bind(this);
    this.onClickTargetAppsToFillHandler = this.onClickTargetAppsToFillHandler.bind(this);
    this.onTargetFillToInputChangeHandler = this.onTargetFillToInputChangeHandler.bind(this);
  }

  calculateDaysSince(date) {
    const unixTime = Date.parse(date);
    const now = Date.now()

    const diff = now - unixTime

    return Math.floor(diff / 86400000)
  }

  sortDate(weeklyArray) {
    const sortedWeeklyArray = weeklyArray.map(el => {
      return Date.parse(el)
    }).sort()
    const convertSortedArrayToString = sortedWeeklyArray.map(el => {
      const date = new Date(el)
      return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
    })
    return convertSortedArrayToString
  }

  // Calculating the Target number of appointments to fill
  calculateTargetAppsToFill(targetFillToInputValue) {
    this.setState({
      appsToFill: Math.floor(this.state.recentInvitationHistory.appsRemaining * (targetFillToInputValue / 100)),
    });
  }

  // DB actions to PUT target percentage of appointments to fill
  async putTargetPercentageAWSDynamo(value) {
    try {
      const response = await axios.put(
        // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
        "https://7j6zpnvol0.execute-api.eu-west-2.amazonaws.com/dev/put-target-percentage",
        { targetPercentage: Number(value) }
      );
      return response.data;
    } catch (error) {
      console.error("Request failed: " + error.message);
    }
  }

  // Handler Function for user errors and calculating target number of appointments to fill
  async onClickTargetAppsToFillHandler(targetFillToInputValue) {
    let value = Number(targetFillToInputValue);

    if ((value) && (value <= 100)) {
      await this.putTargetPercentageAWSDynamo(value);
      this.calculateTargetAppsToFill(targetFillToInputValue);
      this.setState({
        displayUserErrorTargetPercentage: false,
      });
    } else {
      this.setState({
        displayUserErrorTargetPercentage: true,
      });
    }
  }

  onTargetFillToInputChangeHandler(e) {
    this.setState({
      targetFillToInputValue: e.target.value,
    });
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
          `https://f2cy8ksz2g.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${currentlySelectedClinicId}&clinicName=${currentlySelectedClinic}`
        )
        .then((response) => {
          const weeklyCapacityData = response.data.WeekCommencingDate.M;
          const weeklyCapacityKeys = this.sortDate(Object.keys(response.data.WeekCommencingDate.M))
          let weeklyCapacityValue = 0
          let weeklyCapacityList = [];
          weeklyCapacityKeys.forEach((key) => {
            weeklyCapacityList.push({
              date: key,
              value: weeklyCapacityData[key].N,
            });
            weeklyCapacityValue += Number(weeklyCapacityData[key].N)
          });

          const prevInviteDate = response.data.PrevInviteDate.S;
          const dateOfPrevInv = prevInviteDate ? prevInviteDate : "Not Available";
          const daysSincePrevInv = prevInviteDate
            ? this.calculateDaysSince(prevInviteDate)
            : "Not Available";

          const clinicInvitationHistory = {
            dateOfPrevInv,
            daysSincePrevInv,
            invSent: response.data.InvitesSent.N,
            appsRemaining: weeklyCapacityValue,
          };

          const addressParts = (response.data.Address.S).split(',');
          const [firstWordAfterComma] = (addressParts[1].trim()).split(' ');
          const displayViewAllPrevInvitations = prevInviteDate ? true : false;

          this.setState({
            clinicId: response.data.ClinicId.S,
            clinicName: response.data.ClinicName.S,
            address1: addressParts[0].trim(),
            address2: firstWordAfterComma,
            postcode: response.data.PostCode.S,
            weeklyCapacity: weeklyCapacityList,
            currentlySelectedClinic: e.target.value,
            cancelChangeText: "Change clinic",
            displayClinicSelector: false,
            recentInvitationHistory: clinicInvitationHistory,
            displayViewAllPrevInvitations: displayViewAllPrevInvitations,
          }, () => {
            this.setState({
              appsToFill: Math.floor(this.state.recentInvitationHistory.appsRemaining * (this.state.targetFillToInputValue / 100)),
            });

          })
        });
    }
  }

  componentDidMount() {
    //Mocked the data below which is supposed to be retrieved from previous page - "Clinic Summary"
    const icb = {
      code: "QJK",
      board: "NHS DEVON INTEGRATED CARE BOARD",
      id: "NHS DEVON INTEGRATED CARE BOARD"
    };

    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    axios
      .get(
        `https://gijt16kt42.execute-api.eu-west-2.amazonaws.com/dev/clinic-icb-list?participatingIcb=${icb.code}`
      )
      .then((response) => {
        this.setState({
          clinicList: [...response.data.map(clinic => {
            return { "clinicId": clinic.ClinicId.S, "clinicName": clinic.ClinicName.S }
          })]
        });

        let initialSelectedClinicId = response.data[0].ClinicId.S
        let initialSelectedClinic = response.data[0].ClinicName.S
        // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
        axios
          .get(
            `https://f2cy8ksz2g.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${initialSelectedClinicId}&clinicName=${initialSelectedClinic}`
          )
          .then((response) => {
            const weeklyCapacityData = response.data.WeekCommencingDate.M;
            const weeklyCapacityKeys = this.sortDate(Object.keys(response.data.WeekCommencingDate.M))
            let weeklyCapacityValue = 0
            let weeklyCapacityList = [];
            weeklyCapacityKeys.forEach((key) => {
              weeklyCapacityList.push({
                date: key,
                value: weeklyCapacityData[key].N,
              });
              weeklyCapacityValue += Number(weeklyCapacityData[key].N)
            });

            const prevInviteDate = response.data.PrevInviteDate.S;
            const dateOfPrevInv = prevInviteDate ? prevInviteDate : "Not Available";
            const daysSincePrevInv = prevInviteDate
              ? this.calculateDaysSince(prevInviteDate)
              : "Not Available";

            const clinicInvitationHistory = {
              dateOfPrevInv,
              daysSincePrevInv,
              invSent: response.data.InvitesSent.N,
              appsRemaining: weeklyCapacityValue,
            };

            const addressParts = (response.data.Address.S).split(',');
            const [firstWordAfterComma] = (addressParts[1].trim()).split(' ');
            const displayViewAllPrevInvitations = prevInviteDate ? true : false;

            this.setState({
              clinicId: response.data.ClinicId.S,
              clinicName: response.data.ClinicName.S,
              address1: response.data.Address.S,
              address1: addressParts[0].trim(),
              address2: firstWordAfterComma,
              postcode: response.data.PostCode.S,
              weeklyCapacity: weeklyCapacityList,
              recentInvitationHistory: clinicInvitationHistory,
              displayViewAllPrevInvitations: displayViewAllPrevInvitations,
            },
              () => {
                // This callback will execute after the state has been updated

                if (this.state.recentInvitationHistory.dateOfPrevInv === "Not Available" ) {
                  this.putTargetPercentageAWSDynamo("50");
                }

                //Executes GET API call below when page renders - grabs default Target Percentage input value
                // and displays the target number of appointments to fill
                // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
                axios
                  .get(
                    "https://7j6zpnvol0.execute-api.eu-west-2.amazonaws.com/dev/target-percentage"
                  )
                  .then((response) => {
                    const targetPercentageValue = response.data.targetPercentage.N;
                    this.setState({
                      targetFillToInputValue: targetPercentageValue,
                      appsToFill: Math.floor(this.state.recentInvitationHistory.appsRemaining * (targetPercentageValue / 100)),
                    });
                  });
              }
            )
          });
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
      recentInvitationHistory,
      displayUserErrorTargetPercentage,
      displayViewAllPrevInvitations,
      targetFillToInputValue,
      appsToFill,
    } = this.state
    return (
      <div>
        <ClinicInformationPage
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
          displayUserErrorTargetPercentage={displayUserErrorTargetPercentage}
          displayViewAllPrevInvitations={displayViewAllPrevInvitations}
          targetFillToInputValue={targetFillToInputValue}
          appsToFill={appsToFill}
          onTargetFillToInputChangeHandler={this.onTargetFillToInputChangeHandler}
          onClickTargetAppsToFillHandler={this.onClickTargetAppsToFillHandler}
          onClickChangeClinicHandler={this.onClickChangeClinicHandler}
          onChangeSelectedClinicHandler={this.onChangeSelectedClinicHandler}
        />
      </div>
    );
  }
}

export default ClinicInformation;
