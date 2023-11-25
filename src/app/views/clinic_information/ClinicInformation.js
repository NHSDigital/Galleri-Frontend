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
      "checkAll": true,
      "lsoaInRange": [""],
      "rangeSelection": 1,
      "selectedLsoa": [],
      "rangeSelectionLocal": 1,
      "selectedLsoaPayload": {}
    }
    this.onClickChangeClinicHandler = this.onClickChangeClinicHandler.bind(this);
    this.onChangeSelectedClinicHandler = this.onChangeSelectedClinicHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onClickGoBackLinkHandler = this.onClickGoBackLinkHandler.bind(this);
    this.onClickTargetAppsToFillHandler = this.onClickTargetAppsToFillHandler.bind(this);
    this.onTargetFillToInputChangeHandler = this.onTargetFillToInputChangeHandler.bind(this);
    this.checkAllHandler = this.checkAllHandler.bind(this);
    this.checkRecord = this.checkRecord.bind(this)
    this.handleRangeSelection = this.handleRangeSelection.bind(this);
    this.lsoaCodesAppsToFill = this.lsoaCodesAppsToFill.bind(this);
  }

  onSubmitHandler(totalToInvite, avgExpectedUptake, lsoaCodesAppsToFill) {
    this.context.setState({
      "isSubmit": true,
      "totalToInvite": totalToInvite,
      "avgExpectedUptake": avgExpectedUptake
    })
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
  }

  onClickGoBackLinkHandler() {
    this.context.setState({ "navigateToClinic": false })
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
  }

  checkAllHandler(event) {
    // toggle between setting the value of checked in all elements in lsoaInRange
    if (event.target.checked) {
      // set all "checked" fields in lsoaInRange to true
      const selectAll = this.state.lsoaInRange.map(lsoa => {
        lsoa.checked = true
        return lsoa
      })
      this.setState({
        lsoaInRange: selectAll
      })
    } else {
      const deselectAll = this.state.lsoaInRange.map(lsoa => {
        lsoa.checked = false
        return lsoa
      })
      this.setState({
        lsoaInRange: deselectAll
      })
    }
  }

  checkRecord(event, el) {
    let selectedLsoaCopy = [...this.state.selectedLsoa]
    const lsoaItemIndex = this.state.selectedLsoa.findIndex((lsoa) => {
      return lsoa.LSOA_2011?.S == el.LSOA_2011?.S
    })

    const item = selectedLsoaCopy[lsoaItemIndex]
    if (event.target.checked) {
      item.checked = true
      selectedLsoaCopy[lsoaItemIndex] = item

      this.setState({
        lsoaInRange: selectedLsoaCopy
      })
    } else {
      item.checked = false
      selectedLsoaCopy[lsoaItemIndex] = item

      this.setState({
        lsoaInRange: selectedLsoaCopy
      })
    }
  }

  handleRangeSelection(value) {
    this.setState({
      rangeSelectionLocal: Number(value.target.selectedOptions[0].text)
    })
    this.context.setState({
      rangeSelection: Number(value.target.selectedOptions[0].text)
    })
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
    this.context.setState({
      targetAppToFill: Math.floor(this.context.state.recentInvitationHistory.appsRemaining * (targetFillToInputValue / 100))
    })
  }

  // DB actions to PUT target percentage of appointments to fill
  async putTargetPercentageAWSDynamo(value) {
    try {
      const response = await axios.put(
        // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
        "https://trln2gzyse.execute-api.eu-west-2.amazonaws.com/dev/put-target-percentage",
        { targetPercentage: Number(value) }
      );
      return response.data;
    } catch (error) {
      console.error("Request failed: " + error.message);
    }
  }

  createLsoaCodePayload(lsoaArray) {
    // create object payload for the incoming lsoaArray
    const lsoaInfo = {};
    lsoaArray.forEach(lsoa => {
      let eachLSOA_2011 = lsoa.LSOA_2011.S;
      let eachIMD_DECILE = lsoa.IMD_DECILE.N;
      let eachFORECAST_UPTAKE = lsoa.FORECAST_UPTAKE.N;

      lsoaInfo[eachLSOA_2011] = {
        "IMD_DECILE": eachIMD_DECILE,
        "FORECAST_UPTAKE": eachFORECAST_UPTAKE
      }
    })
    this.setState({ "selectedLsoaPayload": lsoaInfo });
    return lsoaInfo;
  }

  // POST lsoa codes and appsToFill (send to lambda)
  async lsoaCodesAppsToFill(lsoaArray) {
    const payloadObject = this.createLsoaCodePayload(lsoaArray)
    try {
      const response = await axios.post(
        // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
        "https://6rj4w9o94k.execute-api.eu-west-2.amazonaws.com/dev/calculate-num-to-invite",
        {
          targetAppsToFill: this.state.appsToFill,
          lsoaCodes: payloadObject
        }
      );
      console.log("logging response = ", response.data)
      this.context.setState({
        "noInviteToGenerate": response.data.numberOfPeopleToInvite,
        "personIdentifiedToInvite": response.data.selectedParticipants
      })
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
    this.context.setState({
      targetPercentageToFill: e.target.value
    })
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
          `https://kgkuw7ml2c.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${currentlySelectedClinicId}&clinicName=${currentlySelectedClinic}`
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
            this.context.setState({
              targetAppToFill: Math.floor(this.context.state.recentInvitationHistory.appsRemaining * (this.state.targetFillToInputValue / 100))
            })
          })
        });
      // Scroll to the top of the page every time it renders the page
      window.scrollTo(0, 0);
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
        `https://qvlgoy2ci4.execute-api.eu-west-2.amazonaws.com/dev/clinic-icb-list?participatingIcb=${this.context.state.icbSelected}`
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
            `https://kgkuw7ml2c.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${initialSelectedClinicId}&clinicName=${initialSelectedClinic}`
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

                if (this.context.state.recentInvitationHistory.dateOfPrevInv === "Not Available") {
                  this.putTargetPercentageAWSDynamo("50");
                }

                //Executes GET API call below when page renders - grabs default Target Percentage input value
                // and displays the target number of appointments to fill
                // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
                axios
                  .get(
                    "https://92y2fwx7jc.execute-api.eu-west-2.amazonaws.com/dev/target-percentage"
                  )
                  .then((response) => {
                    const targetPercentageValue = response.data.targetPercentage.N;
                    this.setState({
                      targetFillToInputValue: targetPercentageValue,
                      appsToFill: Math.floor(this.context.state.recentInvitationHistory.appsRemaining * (targetPercentageValue / 100)),
                    });
                    this.context.setState({
                      targetAppToFill: Math.floor(this.context.state.recentInvitationHistory.appsRemaining * (targetPercentageValue / 100)),
                      targetPercentageToFill: targetPercentageValue
                    })
                  });
              }
            )
          });
      });

    // Trigger lambda to get LSOAs in 100 mile radius
    // TODO: placeholder postcode as the clinic postcode is generated off of random string
    // therefore there is no guarentee that the postcode actually exists
    const postcodeHolder = "SE1 9RT" // const clinicPostcode = this.state.postcode
    axios
      .get(
        `https://v8fv600z7c.execute-api.eu-west-2.amazonaws.com/dev/get-lsoa-in-range?clinicPostcode=${postcodeHolder}&miles=${this.state.rangeSelectionLocal}`
      )
      .then((response) => {
        this.setState({
          lsoaInRange: response.data.sort((a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N),
          selectedLsoa: response.data.sort((a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N)
        })
      });
  }

  componentDidUpdate(_, prevState) {
    if (this.state.rangeSelectionLocal !== prevState.rangeSelectionLocal || this.state.postcode !== prevState.postcode) {
      // placeholder postcode as the clinic postcode is generated off of random string
      // TODO: placeholder postcode as the clinic postcode is generated off of random string
      // therefore there is no guarantee that the postcode actually exists
      // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
      const postcodeHolder = "SW1A 2AA" // const clinicPostcode = this.state.postcode
      axios
        .get(
          `https://v8fv600z7c.execute-api.eu-west-2.amazonaws.com/dev/get-lsoa-in-range?clinicPostcode=${postcodeHolder}&miles=${this.state.rangeSelectionLocal}`
        )
        .then((response) => {
          this.setState({
            lsoaInRange: response.data.sort((a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N),
            selectedLsoa: response.data.sort((a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N)
          })
        })
    }

    // lsoaDataError(lsoa)
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
    } = this.context.state

    const {
      displayUserErrorTargetPercentage,
      targetFillToInputValue,
      appsToFill,
      lsoaInRange,
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
                  lsoaInRange={lsoaInRange}
                  onClickChangeClinicHandler={this.onClickChangeClinicHandler}
                  onChangeSelectedClinicHandler={this.onChangeSelectedClinicHandler}
                  onSubmitHandler={this.onSubmitHandler}
                  onClickGoBackLinkHandler={this.onClickGoBackLinkHandler}
                  onTargetFillToInputChangeHandler={this.onTargetFillToInputChangeHandler}
                  onClickTargetAppsToFillHandler={this.onClickTargetAppsToFillHandler}
                  handleRangeSelection={this.handleRangeSelection}
                  checkRecord={this.checkRecord}
                  checkAllHandler={this.checkAllHandler}
                  lsoaCodesAppsToFill={this.lsoaCodesAppsToFill}
                />
              </div>
            )
          ) : (
            <div>
              <InvitationSummary />
            </div>
          )
        }
      </div >
    );
  }
}

export default ClinicInformation;
ClinicInformation.contextType = AppStateContext;
