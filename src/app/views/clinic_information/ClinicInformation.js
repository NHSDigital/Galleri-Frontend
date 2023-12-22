
import React, { Component } from 'react';
import ClinicInformationPage from './ClinicInformationPage';
import InvitationSummary from '../invitation_summary/InvitationSummary';
import { AppStateContext } from '@/app/context/AppStateContext';
import { setClinicDetails } from '../../helper/helperMethods';
import axios from 'axios';


const CLINIC_SUMMARY_LIST = process.env.NEXT_PUBLIC_CLINIC_SUMMARY_LIST;
const CLINIC_INFORMATION = process.env.NEXT_PUBLIC_CLINIC_INFORMATION;
const CLINIC_ICB_LIST = process.env.NEXT_PUBLIC_CLINIC_ICB_LIST;
const PUT_TARGET_PERCENTAGE = process.env.NEXT_PUBLIC_PUT_TARGET_PERCENTAGE;
const TARGET_PERCENTAGE = process.env.NEXT_PUBLIC_TARGET_PERCENTAGE;
const CALCULATE_NUM_TO_INVITE = process.env.NEXT_PUBLIC_CALCULATE_NUM_TO_INVITE;
const GET_LSOA_IN_RANGE = process.env.NEXT_PUBLIC_GET_LSOA_IN_RANGE;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

class ClinicInformation extends Component {
  constructor() {
    super();
    this.state = {
      displayUserErrorTargetPercentage: false,
      displayViewAllPrevInvitations: false,
      lsoaInRange: [""],
      rangeSelection: 1,
      postcode: "",
      selectedLsoa: [],
      targetFillToInputValue: 0,
      appsToFill: 0,
      targetErrorMessage: "",
      hrefErrorMessage: "",
      lsoaTableError: false,
    };

    this.onClickChangeClinicHandler =
      this.onClickChangeClinicHandler.bind(this);
    this.onChangeSelectedClinicHandler =
      this.onChangeSelectedClinicHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onClickGoBackLinkHandler = this.onClickGoBackLinkHandler.bind(this);
    this.onClickTargetAppsToFillHandler =
      this.onClickTargetAppsToFillHandler.bind(this);
    this.onTargetFillToInputChangeHandler =
      this.onTargetFillToInputChangeHandler.bind(this);
    this.checkAllHandler = this.checkAllHandler.bind(this);
    this.checkRecord = this.checkRecord.bind(this);
    this.handleRangeSelection = this.handleRangeSelection.bind(this);
    this.lsoaCodesAppsToFill = this.lsoaCodesAppsToFill.bind(this);
    this.onCurrentPageChange = this.onCurrentPageChange.bind(this);
    this.onPageSizeChange = this.onPageSizeChange.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onSubmitHandler(totalToInvite, avgExpectedUptake, lsoaCodesAppsToFill) {
    if (totalToInvite === 0) {
      this.setState({
        targetErrorMessage: "You must select LSOAs with people to invite",
        hrefErrorMessage: "#lsoa-error-message",
        lsoaTableError: true,
      });
      this.context.setState({
        isSubmit: false,
      });
      this.scrollToErrorContent();
    } else {
      this.context.setState({
        isSubmit: true,
        totalToInvite: totalToInvite,
        avgExpectedUptake: avgExpectedUptake,
      });
      this.setState({
        lsoaTableError: false,
        displayUserErrorTargetPercentage: false,
      })

      // Scroll to the top of the page every time it renders the page
      window.scrollTo(0, 0);
    }
  }

  onClickGoBackLinkHandler() {
    this.context.setState({ navigateToClinic: false });
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
    this.context.setState({
      pageSize: 10,
      currentPage: 1,
    });
  }

  onKeyUp(e) {
    if (e.key === "Enter" || e.keyCode === 32) {
      let errorContent;
      if (this.state.hrefErrorMessage === "#lsoa-error-message")
        errorContent = document.getElementById("lsoa-error-message");
      else if (this.state.hrefErrorMessage === "#error-message")
        errorContent = document.getElementById("error-message");
      if (errorContent) {
        errorContent.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }

  checkAllHandler(event) {
    // toggle between setting the value of checked in all elements in lsoaInRange
    if (event.target.checked) {
      // set all "checked" fields in lsoaInRange to true
      const selectAll = this.state.lsoaInRange.map((lsoa) => {
        lsoa.checked = true;
        return lsoa;
      });
      this.setState({
        lsoaInRange: selectAll,
      });
    } else {
      const deselectAll = this.state.lsoaInRange.map((lsoa) => {
        lsoa.checked = false;
        return lsoa;
      });
      this.setState({
        lsoaInRange: deselectAll,
      });
    }
  }

  checkRecord(event, el) {
    let selectedLsoaCopy = [...this.state.selectedLsoa];
    const lsoaItemIndex = this.state.selectedLsoa.findIndex((lsoa) => {
      return lsoa.LSOA_2011?.S == el.LSOA_2011?.S;
    });

    const item = selectedLsoaCopy[lsoaItemIndex];
    if (event.target.checked) {
      item.checked = true;
      selectedLsoaCopy[lsoaItemIndex] = item;

      this.setState({
        lsoaInRange: selectedLsoaCopy,
      });
    } else {
      item.checked = false;
      selectedLsoaCopy[lsoaItemIndex] = item;

      this.setState({
        lsoaInRange: selectedLsoaCopy,
      });
    }
  }

  handleRangeSelection(e) {
    this.setState({
      rangeSelection: Number(e.target.selectedOptions[0].text),
    });
    this.context.setState({
      rangeSelection: Number(e.target.selectedOptions[0].text),
    });
  }

  onCurrentPageChange(page) {
    this.context.setState({
      currentPage: page,
    });
  }

  onPageSizeChange(e) {
    this.context.setState({
      pageSize: e.target.value,
      currentPage: 1,
    });
  }

  // Calculating the Target number of appointments to fill
  calculateTargetAppsToFill(targetFillToInputValue) {
    this.setState({
      appsToFill: Math.floor(
        this.context.state.recentInvitationHistory.appsRemaining *
        (targetFillToInputValue / 100)
      ),
    });
    this.context.setState({
      targetAppToFill: Math.floor(
        this.context.state.recentInvitationHistory.appsRemaining *
        (targetFillToInputValue / 100)
      ),
    });
  }

  // DB actions to PUT target percentage of appointments to fill
  async putTargetPercentageAWSDynamo(value) {
    try {
      const response = await axios.put(
        `https://${PUT_TARGET_PERCENTAGE}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/put-target-percentage`,
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
    lsoaArray.forEach((lsoa) => {
      let eachLSOA_2011 = lsoa.LSOA_2011.S;
      let eachIMD_DECILE = lsoa.IMD_DECILE.N;
      let eachFORECAST_UPTAKE = lsoa.FORECAST_UPTAKE.N;

      lsoaInfo[eachLSOA_2011] = {
        IMD_DECILE: eachIMD_DECILE,
        FORECAST_UPTAKE: eachFORECAST_UPTAKE,
      };
    });
    return lsoaInfo;
  }

  // POST lsoa codes and appsToFill (send to lambda)
  async lsoaCodesAppsToFill(lsoaArray) {
    const payloadObject = this.createLsoaCodePayload(lsoaArray);
    try {
      const response = await axios.post(
        // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
        `https://${CALCULATE_NUM_TO_INVITE}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/calculate-num-to-invite`,
        {
          targetAppsToFill: this.state.appsToFill,
          lsoaCodes: payloadObject,
        }
      );
      this.context.setState({
        noInviteToGenerate: response.data.numberOfPeopleToInvite,
        personIdentifiedToInvite: response.data.selectedParticipants,
      });
      return response.data;
    } catch (error) {
      console.error("Request failed: " + error.message);
    }
  }

  // Handler Function for user errors and calculating target number of appointments to fill
  async onClickTargetAppsToFillHandler(targetFillToInputValue) {
    let value = Number(targetFillToInputValue);

    if (value && value <= 100) {
      this.setState({
        appsToFill: Math.floor(
          this.context.state.recentInvitationHistory.appsRemaining *
          (targetFillToInputValue / 100)
        ),
        displayUserErrorTargetPercentage: false,
      });
      this.context.setState({
        targetAppToFill: Math.floor(
          this.context.state.recentInvitationHistory.appsRemaining *
          (targetFillToInputValue / 100)
        ),
      });
    } else {
      this.setState({
        displayUserErrorTargetPercentage: true,
        hrefErrorMessage: "#error-message",
      });
      this.scrollToErrorContent();
      if (!value) {
        this.setState({
          targetErrorMessage: "Enter a target percentage between 1% and 100%",
        });
      } else {
        this.setState({
          targetErrorMessage:
            "The target percentage must be between 1% and 100%",
        });
      }
    }
  }

  onTargetFillToInputChangeHandler(e) {
    this.setState({
      targetFillToInputValue: e.target.value,
    });
    this.context.setState({
      targetPercentageToFill: e.target.value,
    });
  }

  scrollToErrorContent() {
    const errorContent = document.getElementById("error-summary");
    if (errorContent) {
      errorContent.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    errorContent.focus();
  }

  onClickChangeClinicHandler() {
    const { displayClinicSelector } = this.context.state;
    switch (displayClinicSelector) {
      case false:
        this.context.setState({
          cancelChangeText: "Cancel change",
          displayClinicSelector: true,
        });
        break;
      case true:
        this.context.setState({
          cancelChangeText: "Change clinic",
          displayClinicSelector: false,
        });
        break;
    }
  }

  fetchClinicInvitationHistory(clinicName, clinicId) {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    return axios.get(
      `https://${CLINIC_INFORMATION}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/clinic-information?clinicId=${clinicId}&clinicName=${clinicName}`
    );
  }

  onChangeSelectedClinicHandler(e) {
    let currentlySelectedClinicId = "";
    let currentlySelectedClinic = "";

    const { clinicIdNameList } = this.context.state;

    if (e.target.value !== "") {
      clinicIdNameList.forEach((clinic) => {
        if (clinic.clinicName === e.target.value) {
          currentlySelectedClinicId = clinic.clinicId;
          currentlySelectedClinic = clinic.clinicName;
          this.context.setState({
            currentlySelectedClinic: clinic.clinicName,
          });
        }
      });
    } else {
      currentlySelectedClinicId = "";
      currentlySelectedClinic = "";
    }

    if (currentlySelectedClinic !== "") {
      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
      // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
      axios
        .get(
          `https://${CLINIC_INFORMATION}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/clinic-information?clinicId=${currentlySelectedClinicId}&clinicName=${currentlySelectedClinic}`
        )
        .then((response) => {
          const {
            lastSelectedRange,
            targetFillToPercentage,
            addressParts,
            firstWordAfterComma,
            weeklyCapacityList,
            clinicInvitationHistory,
            displayViewAllPrevInvitations,
          } = setClinicDetails(response);


          // Set component state
          this.setState({
            rangeSelection: lastSelectedRange,
            targetFillToInputValue: targetFillToPercentage,
            postcode: response.data.PostCode.S,
            appsToFill: Math.floor(
              this.context.state.recentInvitationHistory.appsRemaining *
                (this.state.targetFillToInputValue / 100)
            ),
          });

          // Set global state
          this.context.setState({
            clinicId: response.data.ClinicId.S,
            clinicName: response.data.ClinicName.S,
            address1: addressParts[0].trim(),
            address2: firstWordAfterComma,
            postcode: response.data.PostCode.S,
            weeklyCapacity: weeklyCapacityList,
            recentInvitationHistory: clinicInvitationHistory,
            displayViewAllPrevInvitations: displayViewAllPrevInvitations,
            currentlySelectedClinic: e.target.value,
            cancelChangeText: "Change clinic",
            displayClinicSelector: false,
            currentPage: 1,
            pageSize: 10,
            appsToFill: Math.floor(
              this.context.state.recentInvitationHistory.appsRemaining *
              (this.state.targetFillToInputValue / 100)
            ),
            targetAppToFill: Math.floor(
              this.context.state.recentInvitationHistory.appsRemaining *
              (this.state.targetFillToInputValue / 100)
            ),
          });
        });
      // Scroll to the top of the page every time it renders the page
      window.scrollTo(0, 0);
    }
  }

  componentDidMount() {
        axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    axios
      .get(
        `https://${CLINIC_ICB_LIST}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/clinic-icb-list?participatingIcb=${this.context.state.icbSelected}`
      )
      .then((response) => {
        this.context.setState({
          clinicIdNameList: [
            ...response.data.map((clinic) => {
              return {
                clinicId: clinic.ClinicId.S,
                clinicName: clinic.ClinicName.S,
              };
            }),
          ],
        });

        let initialSelectedClinicId = this.context.state.clinicIdSelected;
        let initialSelectedClinic = this.context.state.clinicNameSelected;
        // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
        axios
          .get(
            `https://${CLINIC_INFORMATION}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/clinic-information?clinicId=${initialSelectedClinicId}&clinicName=${initialSelectedClinic}`
          )
          .then((response) => {
            const {
              lastSelectedRange,
              targetFillToPercentage,
              addressParts,
              firstWordAfterComma,
              weeklyCapacityList,
              clinicInvitationHistory,
              displayViewAllPrevInvitations,
            } = setClinicDetails(response);

            // Set component state
            this.setState({
              rangeSelection: lastSelectedRange,
              targetFillToInputValue: targetFillToPercentage,
              postcode: response.data.PostCode.S,
              targetFillToInputValue: response.data.TargetFillToPercentage.N
            });

            // Set global state
            this.context.setState({
              clinicId: response.data.ClinicId.S,
              clinicName: response.data.ClinicName.S,
              address1: addressParts[0].trim(),
              address2: firstWordAfterComma,
              postcode: response.data.PostCode.S,
              weeklyCapacity: weeklyCapacityList,
              recentInvitationHistory: clinicInvitationHistory,
              displayViewAllPrevInvitations: displayViewAllPrevInvitations,
              currentPage: 1,
              pageSize: 10,
            });
            if (
              this.context.state.recentInvitationHistory.dateOfPrevInv ===
              "Not Available"
            ) {
              this.putTargetPercentageAWSDynamo("50");
            }

            this.setState({
              appsToFill: Math.floor(
                clinicInvitationHistory.appsRemaining *
                  (response.data.TargetFillToPercentage.N / 100)
              ),
            })

            //Executes GET API call below when page renders - grabs default Target Percentage input value
            // and displays the target number of appointments to fill
            // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
            // axios
            //   .get(
            //     `https://${TARGET_PERCENTAGE}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/target-percentage`
            //   )
            //   .then((response) => {
                const targetPercentageValue = response.data.targetPercentage.N;
                this.setState({
                  targetFillToInputValue: targetPercentageValue,
                  appsToFill: Math.floor(
                    this.context.state.recentInvitationHistory.appsRemaining *
                      (targetPercentageValue / 100)
                  ),
                });
                this.context.setState({
                  targetAppToFill: Math.floor(
                    this.context.state.recentInvitationHistory.appsRemaining *
                      (targetPercentageValue / 100)
                  ),
                  targetPercentageToFill: targetPercentageValue,
                });
              // });
          });
      });

    // Trigger lambda to get LSOAs in 100 mile radius
    // TODO: placeholder postcode as the clinic postcode is generated off of random string
    // therefore there is no guarentee that the postcode actually exists
    // const postcodeHolder = "SE1 9RT";
    axios
      .get(
        `https://${GET_LSOA_IN_RANGE}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/get-lsoa-in-range?clinicPostcode=${this.context.state.postcode}&miles=${this.state.rangeSelection}`
      )
      .then((response) => {
        this.setState({
          lsoaInRange: response.data.sort(
            (a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N
          ),
          selectedLsoa: response.data.sort(
            (a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N
          ),
        });
      });
  }

  componentDidUpdate(_, prevState) {
    if (
      this.state.rangeSelection !== prevState.rangeSelection ||
      this.state.postcode !== prevState.postcode
    ) {
      // placeholder postcode as the clinic postcode is generated off of random string
      // therefore there is no guarantee that the postcode actually exists
      // TODO: placeholder postcode as the clinic postcode is generated off of random string
      // const postcodeHolder = "SW1A 2AA";
      axios
        .get(
          `https://${GET_LSOA_IN_RANGE}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/get-lsoa-in-range?clinicPostcode=${this.context.state.postcode}&miles=${this.state.rangeSelection}`
        )
        .then((response) => {
          this.setState({
            lsoaInRange: response.data.sort(
              (a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N
            ),
            selectedLsoa: response.data.sort(
              (a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N
            ),
          });
        });
    }
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
      pageSize,
      currentPage,
    } = this.context.state;

    const {
      displayUserErrorTargetPercentage,
      lsoaInRange,
      targetFillToInputValue,
      rangeSelection,
      appsToFill,
      targetErrorMessage,
      hrefErrorMessage,
      lsoaTableError,
    } = this.state;

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
                  displayUserErrorTargetPercentage={
                    displayUserErrorTargetPercentage
                  }
                  targetErrorMessage={targetErrorMessage}
                  displayViewAllPrevInvitations={displayViewAllPrevInvitations}
                  targetFillToInputValue={targetFillToInputValue}
                  appsToFill={appsToFill}
                  lsoaInRange={lsoaInRange}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  lastSelectedRange={rangeSelection}
                  onClickChangeClinicHandler={this.onClickChangeClinicHandler}
                  onChangeSelectedClinicHandler={
                    this.onChangeSelectedClinicHandler
                  }
                  onSubmitHandler={this.onSubmitHandler}
                  onClickGoBackLinkHandler={this.onClickGoBackLinkHandler}
                  onTargetFillToInputChangeHandler={
                    this.onTargetFillToInputChangeHandler
                  }
                  onClickTargetAppsToFillHandler={
                    this.onClickTargetAppsToFillHandler
                  }
                  handleRangeSelection={this.handleRangeSelection}
                  checkRecord={this.checkRecord}
                  checkAllHandler={this.checkAllHandler}
                  lsoaCodesAppsToFill={this.lsoaCodesAppsToFill}
                  onPageSizeChange={this.onPageSizeChange}
                  onCurrentPageChange={this.onCurrentPageChange}
                  onKeyUp={this.onKeyUp}
                  hrefErrorMessage={hrefErrorMessage}
                  lsoaTableError={lsoaTableError}
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
