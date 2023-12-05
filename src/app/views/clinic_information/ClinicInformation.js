import React, { Component } from "react";
import ClinicInformationPage from "./ClinicInformationPage";
import InvitationSummary from "../invitation_summary/InvitationSummary";
import { AppStateContext } from "@/app/context/AppStateContext";
import { sortDate, calculateDaysSince } from "../../helper/helperMethods";
import axios from "axios";

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
      selectedLsoa: [],
      targetFillToInputValue: 0,
      rangeSelection: 1,
      appsToFill: 0,
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
  }

  onSubmitHandler(totalToInvite, avgExpectedUptake, lsoaCodesAppsToFill) {
    this.context.setState({
      isSubmit: true,
      totalToInvite: totalToInvite,
      avgExpectedUptake: avgExpectedUptake,
    });
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
  }

  onClickGoBackLinkHandler() {
    this.context.setState({ navigateToClinic: false });
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
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
        // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
        `https://3qwp33xpah.execute-api.eu-west-2.amazonaws.com/dev/put-target-percentage`,
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
        `https://t0roc51vb5.execute-api.eu-west-2.amazonaws.com/dev/calculate-num-to-invite`,
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
      });
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

  setClinicDetails(response) {
    const weeklyCapacityData = response.data.WeekCommencingDate.M;
    const weeklyCapacityKeys = sortDate(
      Object.keys(response.data.WeekCommencingDate.M)
    );
    let weeklyCapacityValue = 0;
    let weeklyCapacityList = [];
    weeklyCapacityKeys.forEach((key) => {
      weeklyCapacityList.push({
        date: key,
        value: weeklyCapacityData[key].N,
      });
      weeklyCapacityValue += Number(weeklyCapacityData[key].N);
    });

    const prevInviteDate = response.data.PrevInviteDate.S;
    const dateOfPrevInv = prevInviteDate ? prevInviteDate : "Not Available";
    const daysSincePrevInv = prevInviteDate
      ? calculateDaysSince(prevInviteDate)
      : "Not Available";

    const clinicInvitationHistory = {
      dateOfPrevInv,
      daysSincePrevInv,
      invSent: response.data.InvitesSent.N,
      appsRemaining: weeklyCapacityValue,
    };

    const addressParts = response.data.Address.S.split(",");
    const [firstWordAfterComma] = addressParts[1].trim().split(" ");
    const displayViewAllPrevInvitations = prevInviteDate ? true : false;

    const lastSelectedRange = response.data.LastSelectedRange.N;
    const targetFillToPercentage = response.data.TargetFillToPercentage.N;

    // Set component state
    this.setState({
      rangeSelection: lastSelectedRange,
      targetFillToInputValue: targetFillToPercentage,
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
    });
  }

  fetchClinicInvitationHistory(clinicName, clinicId) {
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    return axios.get(
      `https://nuw7pl0ajk.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${clinicId}&clinicName=${clinicName}`
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
          `https://nuw7pl0ajk.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${currentlySelectedClinicId}&clinicName=${currentlySelectedClinic}`
        )
        .then((response) => {
          this.setClinicDetails(response);

          // Set specific global state
          this.context.setState({
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
        `https://uvewcaxa9d.execute-api.eu-west-2.amazonaws.com/dev/clinic-icb-list?participatingIcb=${this.context.state.icbSelected}`
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
            `https://nuw7pl0ajk.execute-api.eu-west-2.amazonaws.com/dev/clinic-information?clinicId=${initialSelectedClinicId}&clinicName=${initialSelectedClinic}`
          )
          .then((response) => {
            this.setClinicDetails(response);

            if (
              this.context.state.recentInvitationHistory.dateOfPrevInv ===
              "Not Available"
            ) {
              this.putTargetPercentageAWSDynamo("50");
            }

            //Executes GET API call below when page renders - grabs default Target Percentage input value
            // and displays the target number of appointments to fill
            // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
            axios
              .get(
                `https://8pv80pts90.execute-api.eu-west-2.amazonaws.com/dev/target-percentage`
              )
              .then((response) => {
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
              });
          });
      });

    // Trigger lambda to get LSOAs in 100 mile radius
    // TODO: placeholder postcode as the clinic postcode is generated off of random string
    // therefore there is no guarentee that the postcode actually exists
    const postcodeHolder = "SE1 9RT"; // const clinicPostcode = this.state.postcode
    axios
      .get(
        `https://43mu01zic7.execute-api.eu-west-2.amazonaws.com/dev/get-lsoa-in-range?clinicPostcode=${postcodeHolder}&miles=${this.context.state.rangeSelection}`
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
      const postcodeHolder = "SW1A 2AA"; // const clinicPostcode = this.state.postcode
      axios
        .get(
          `https://43mu01zic7.execute-api.eu-west-2.amazonaws.com/dev/get-lsoa-in-range?clinicPostcode=${postcodeHolder}&miles=${this.context.state.rangeSelection}`
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
      updateClinicRecentHistory,
    } = this.context.state;

    const {
      displayUserErrorTargetPercentage,
      lsoaInRange,
      targetFillToInputValue,
      rangeSelection,
      appsToFill,
    } = this.state;

    // Check if all the listed context state variables are available
    const isContextLoaded =
      clinicIdNameList.length > 0 &&
      clinicName !== "" &&
      address1 !== "" &&
      address2 !== "" &&
      postcode !== "" &&
      weeklyCapacity.length > 0;

    // console.trace("recentInvitationHistory = ", recentInvitationHistory);
    // "dateOfPrevInv": "Not available",
    // "daysSincePrevInv": "Not available",
    // "invSent": 0,
    // "appsRemaining": 0,

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
