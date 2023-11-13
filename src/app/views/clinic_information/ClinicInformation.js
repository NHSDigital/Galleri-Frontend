import React, { Component } from 'react';
import ClinicInformationPage from './ClinicInformationPage';
import InvitationSummary from '../invitation_summary/InvitationSummary';
import { AppStateContext } from '@/app/context/AppStateContext';

import axios from 'axios';

class ClinicInformation extends Component {
  constructor() {
    super();
    this.state = {
      "displayUserErrorTargetPercentage": false,
      "displayViewAllPrevInvitations": false,
      "targetFillToInputValue": 0,
      "appsToFill": 0,
    }
    this.onClickChangeClinicHandler = this.onClickChangeClinicHandler.bind(this);
    this.onChangeSelectedClinicHandler = this.onChangeSelectedClinicHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onClickGoBackLinkHandler = this.onClickGoBackLinkHandler.bind(this);
  }

  onSubmitHandler() {
    this.context.setState({ "isSubmit": true })
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
  }

  onClickGoBackLinkHandler() {
    this.context.setState({ "navigateToClinic": false })
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
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
      appsToFill: Math.floor(this.context.state.recentInvitationHistory.appsRemaining * (targetFillToInputValue / 100)),
    });
  }

  // DB actions to PUT target percentage of appointments to fill
  async putTargetPercentageAWSDynamo(value) {
    try {
      const response = await axios.put(
        // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
        "https://je5d3ew5i1.execute-api.eu-west-2.amazonaws.com/dev/put-target-percentage",
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
    const { displayClinicSelector } = this.context.state;
    switch (displayClinicSelector) {
      case false:
        this.context.setState({
          cancelChangeText: "Cancel change",
          displayClinicSelector: true
        })
        break;
      case true:
        this.context.setState({
          cancelChangeText: "Change clinic",
          displayClinicSelector: false
        })
        break;
    }
  }

  onChangeSelectedClinicHandler(e) {
    let currentlySelectedClinicId = "";
    let currentlySelectedClinic = "";

    const { clinicIdNameList } = this.context.state;

    if (e.target.value !== "") {
      clinicIdNameList.forEach(clinic => {
        if (clinic.clinicName === e.target.value) {
          currentlySelectedClinicId = clinic.clinicId;
          currentlySelectedClinic = clinic.clinicName;
          this.context.setState({
            currentlySelectedClinic: clinic.clinicName
          })
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

          this.context.setState({
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
              appsToFill: Math.floor(this.context.state.recentInvitationHistory.appsRemaining * (this.state.targetFillToInputValue / 100)),
            });
          })
        });
      // Scroll to the top of the page every time it renders the page
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
    // const icbId = "Participating ICB 2"

    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    axios
      .get(
        `https://gijt16kt42.execute-api.eu-west-2.amazonaws.com/dev/clinic-icb-list?participatingIcb=${this.context.state.icbSelected}`
      )
      .then((response) => {
        this.context.setState({
          clinicIdNameList: [...response.data.map(clinic => {
            return { "clinicId": clinic.ClinicId.S, "clinicName": clinic.ClinicName.S }
          })]
        });

        let initialSelectedClinicId = this.context.state.clinicIdSelected;
        let initialSelectedClinic = this.context.state.clinicNameSelected;
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

            this.context.setState({
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

                if (this.context.state.recentInvitationHistory.dateOfPrevInv === "Not Available" ) {
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
                      appsToFill: Math.floor(this.context.state.recentInvitationHistory.appsRemaining * (targetPercentageValue / 100)),
                    });
                  });
              }
            )
          });
      });
  }

  render() {
    const {
      clinicIdNameList,
      clinicName,
      address1,
      address2,
      postcode,
      weeklyCapacity,
      lastUpdated,
      cancelChangeText,
      displayClinicSelector,
      recentInvitationHistory,
      currentlySelectedClinic,
      displayViewAllPrevInvitations,
      isSubmit
    } = this.context.state
    
    const {
      displayUserErrorTargetPercentage,
      targetFillToInputValue,
      appsToFill,
    } = this.state

    // Check if all the listed context state variables are available
    const isContextLoaded =
      clinicIdNameList.length > 0 &&
      clinicName !== "" &&
      address1 !== "" &&
      address2 !== "" &&
      postcode !== "" &&
      weeklyCapacity.length > 0;

    return (
      <div>
        {
          // Check if a Calculate number to invite button has been clicked
          // If clicked render the Invitation Summary page and pass the props
          // Also added conditional rendering to ensure that the page is rendered only after certain context state variables are loaded
          !this.context.state.isSubmit ? (
            isContextLoaded && (
              <div>
                <ClinicInformationPage
                  clinicIdNameList={clinicIdNameList}
                  clinicName={clinicName}
                  address1={address1}
                  address2={address2}
                  postcode={postcode}
                  weeklyCapacity={weeklyCapacity}
                  lastUpdated={lastUpdated}
                  displayClinicSelector={displayClinicSelector}
                  cancelChangeText={cancelChangeText}
                  recentInvitationHistory={recentInvitationHistory}
                  currentlySelectedClinic={currentlySelectedClinic}
                  displayUserErrorTargetPercentage={displayUserErrorTargetPercentage}
                  displayViewAllPrevInvitations={displayViewAllPrevInvitations}
                  targetFillToInputValue={targetFillToInputValue}
                  appsToFill={appsToFill}
                  onClickChangeClinicHandler={this.onClickChangeClinicHandler}
                  onChangeSelectedClinicHandler={this.onChangeSelectedClinicHandler}
                  onSubmitHandler={this.onSubmitHandler}
                  onClickGoBackLinkHandler={this.onClickGoBackLinkHandler}
                />
              </div>
            )
          ) : (
            <div>
              <InvitationSummary />
            </div>
          )
        }
      </div>
    );
  }
}

export default ClinicInformation;
ClinicInformation.contextType = AppStateContext;
