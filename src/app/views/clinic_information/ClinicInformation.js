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
      "targetFillToInputValue": 0,
      "appsToFill": 0,
      "checkAll": false,
      "recentInvitationHistory": {
        "dateOfPrevInv": "Not available",
        "daysSincePrevInv": "Not available",
        "invSent": 0,
        "appsRemaining": 0
      },
      "lsoaInRange": [],
      "rangeSelection": 1,
      "selectedLsoa": [],
      "clickedButton": false
    }

    this.onClickChangeClinicHandler = this.onClickChangeClinicHandler.bind(this);
    this.onChangeSelectedClinicHandler = this.onChangeSelectedClinicHandler.bind(this);
    this.onClickTargetAppsToFillHandler = this.onClickTargetAppsToFillHandler.bind(this);
    this.onTargetFillToInputChangeHandler = this.onTargetFillToInputChangeHandler.bind(this);
    this.checkAllHandler = this.checkAllHandler.bind(this);
    this.handleRangeSelection = this.handleRangeSelection.bind(this);
    this.onClickLsoaCodesAppsToFillHandler = this.onClickLsoaCodesAppsToFillHandler.bind(this);
    this.isCheckedLsoaHandler = this.isCheckedLsoaHandler.bind(this);
  }

  checkAllHandler(event) {
    if (event.target.checked) {
      this.setState({
        checkAll: true
      })
    } else {
      this.setState({
        checkAll: false
      })
    }
  }
  //example
  // { "E01022970": {
  //                 "IMD_DECILE": 2,
  //                 "FORECAST_UPTAKE": 13
  //                }
  // }
  isCheckedLsoaHandler(event, lsoaInRange) {
    const lsoaInfo = {};
    if (event.target.checked === true) {
      for (let i = 0; i < lsoaInRange.length; i++) {
        console.log(lsoaInRange[i]);
        let eachLSOA_2011 = lsoaInRange[i].LSOA_2011.S;
        // console.log(eachLSOA_2011);
        let eachIMD_DECILE = lsoaInRange[i].IMD_DECILE.N;
        // console.log(eachIMD_DECILE);
        let eachFORECAST_UPTAKE = lsoaInRange[i].FORECAST_UPTAKE.N;
        // console.log(eachFORECAST_UPTAKE);
        lsoaInfo[eachLSOA_2011] = {
          "IMD_DECILE": eachIMD_DECILE,
          "FORECAST_UPTAKE": eachFORECAST_UPTAKE
        }
        lsoaInRange[i].CHECKED = "true";
      }
      console.log('lsoaInfo below:');
      console.log(lsoaInfo);
    } else {
      for (let i = 1; i < lsoaInRange.length; i++) {
        lsoaInRange[i].CHECKED = "false";
        console.log(lsoaInRange);
      }
    }
    console.log(lsoaInRange);
    console.log(event);
    this.setState({ "selectedLsoa": lsoaInfo });
    return lsoaInfo;
  }

  handleRangeSelection(value) {
    this.setState({
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
      appsToFill: Math.floor(this.state.recentInvitationHistory.appsRemaining * (targetFillToInputValue / 100)),
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



  // POST lsoa codes and appsToFill (send to lambda)
  async onClickLsoaCodesAppsToFillHandler(e) {
    // axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    // axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    console.log(this.state.appsToFill);
    console.log(this.state.selectedLsoa);
    try {
      const response = await axios.post(
        // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
        "https://3seozz1pi5.execute-api.eu-west-2.amazonaws.com/dev/calculate-num-to-invite",
        {
          targetAppsToFill: this.state.appsToFill,
          lsoaCodes: this.state.selectedLsoa
        }
      );
      return response.data;
    } catch (error) {
      console.error("Request failed: " + error.message);
    }
  }
  //   let fullUrl =
  //     "https://vnfuxrr9ke.execute-api.eu-west-2.amazonaws.com/dev/calculate-num-to-invite";
  //   // let headers = {
  //   //   "Access-Control-Request-Headers": "content-type",
  //   // };
  //   let fileContent = {
  //     targetAppsToFill: "131",
  //     lsoaCodes: {
  //       E01000005: {
  //         IMD_DECILE: "3",
  //         FORECAST_UPTAKE: "1",
  //       },
  //       E01004294: {
  //         IMD_DECILE: "5",
  //         FORECAST_UPTAKE: "1",
  //       },
  //       E01032767: {
  //         IMD_DECILE: "7",
  //         FORECAST_UPTAKE: "1",
  //       },
  //       E01032739: {
  //         IMD_DECILE: "7",
  //         FORECAST_UPTAKE: "1",
  //       },
  //       E01004293: {
  //         IMD_DECILE: "8",
  //         FORECAST_UPTAKE: "1",
  //       },
  //     },
  //   };

  //   console.log("Sending fullUrl: ", fullUrl)
  //   console.log("Sending fileContent: ", fileContent)
  //   // console.log(axios.post(fullUrl, fileContent, config))

  //   // let config = { headers: headers };
  //   let response = axios.post(fullUrl, fileContent).then((response) => {
  //     console.log(response.data)
  //   });

  //   console.log(response.data)
  // }
  //   const paramsPayload = {
  //     targetAppsToFill: "131",
  //     lsoaCodes: {
  //       E01000005: {
  //         IMD_DECILE: "3",
  //         FORECAST_UPTAKE: "1",
  //       },
  //       E01004294: {
  //         IMD_DECILE: "5",
  //         FORECAST_UPTAKE: "1",
  //       },
  //       E01032767: {
  //         IMD_DECILE: "7",
  //         FORECAST_UPTAKE: "1",
  //       },
  //       E01032739: {
  //         IMD_DECILE: "7",
  //         FORECAST_UPTAKE: "1",
  //       },
  //       E01004293: {
  //         IMD_DECILE: "8",
  //         FORECAST_UPTAKE: "1",
  //       },
  //     },
  //   };

  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-RapidAPI-Host': 'https://vnfuxrr9ke.execute-api.eu-west-2.amazonaws.com/dev/calculate-num-to-invite',
  //       "Sec-Fetch-Mode": "cors",
  //       "Sec-Fetch-Site": "cross-site"
  //     },
  //     body: JSON.stringify(paramsPayload)
  //   };
  //   console.log('Starting Fetch->');
  //   fetch('https://ww2jhwtkke.execute-api.eu-west-2.amazonaws.com/dev/calculate-num-to-invite', options)
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.log(error));
  // }// will need to add some conditionals on when this fires

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

          const clinicInvitationHistory = {
            dateOfPrevInv: response.data.PrevInviteDate.S,
            daysSincePrevInv: this.calculateDaysSince(
              response.data.PrevInviteDate.S
            ),
            invSent: response.data.InvitesSent.N,
            appsRemaining: weeklyCapacityValue,
          };

          const addressParts = (response.data.Address.S).split(',');
          const [firstWordAfterComma] = (addressParts[1].trim()).split(' ');

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
          }, () => {
            this.setState({
              appsToFill: Math.floor(this.state.recentInvitationHistory.appsRemaining * (this.state.targetFillToInputValue / 100)),
            });

          })
        });
    }
  }

  componentDidMount() {
    // let fullUrl =
    //   "https://vnfuxrr9ke.execute-api.eu-west-2.amazonaws.com/dev/calculate-num-to-invite";
    // let headers = {
    //   accept: "application/vnd.mesh.v2+json",
    //   "Content-Type": "application/json",
    // };
    // let fileContent = {
    //   targetAppsToFill: "131",
    //   lsoaCodes: {
    //     E01000005: {
    //       IMD_DECILE: "3",
    //       FORECAST_UPTAKE: "1",
    //     },
    //     E01004294: {
    //       IMD_DECILE: "5",
    //       FORECAST_UPTAKE: "1",
    //     },
    //     E01032767: {
    //       IMD_DECILE: "7",
    //       FORECAST_UPTAKE: "1",
    //     },
    //     E01032739: {
    //       IMD_DECILE: "7",
    //       FORECAST_UPTAKE: "1",
    //     },
    //     E01004293: {
    //       IMD_DECILE: "8",
    //       FORECAST_UPTAKE: "1",
    //     },
    //   },
    // };
    // // let config = { headers: headers };
    // let response = axios.post(fullUrl, fileContent).then((response) => {
    //   console.log(response.data)
    // });

    // console.log(response.data)
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

            const clinicInvitationHistory = {
              dateOfPrevInv: response.data.PrevInviteDate.S,
              daysSincePrevInv: this.calculateDaysSince(
                response.data.PrevInviteDate.S
              ),
              invSent: response.data.InvitesSent.N,
              appsRemaining: weeklyCapacityValue,
            };

            const addressParts = (response.data.Address.S).split(',');
            const [firstWordAfterComma] = (addressParts[1].trim()).split(' ');

            this.setState({
              clinicId: response.data.ClinicId.S,
              clinicName: response.data.ClinicName.S,
              address1: response.data.Address.S,
              address1: addressParts[0].trim(),
              address2: firstWordAfterComma,
              postcode: response.data.PostCode.S,
              weeklyCapacity: weeklyCapacityList,
              recentInvitationHistory: clinicInvitationHistory,
            },
              () => {
                // This callback will execute after the state has been updated

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

    // Trigger lambda to get LSOAs in 100 mile radius
    // TODO: placeholder postcode as the clinic postcode is generated off of random string
    // therefore there is no guarentee that the postcode actually exists
    const postcodeHolder = "SE1 9RT" // const clinicPostcode = this.state.postcode
    axios
      .get(
        `https://vknseewvml.execute-api.eu-west-2.amazonaws.com/dev/get-lsoa-in-range?clinicPostcode=${postcodeHolder}&miles=${this.state.rangeSelection}`
      )
      .then((response) => {
        this.setState({
          lsoaInRange: response.data.sort((a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N)
        })
      });
  }

  componentDidUpdate(_, prevState) {
    //   if (this.state.clickedButton !== prevState.clickedButton) {
    //     console.log("Abdul come closer")
    //     let fullUrl =
    //     "https://vnfuxrr9ke.execute-api.eu-west-2.amazonaws.com/dev/calculate-num-to-invite";
    //     let headers = {
    //       accept: "application/vnd.mesh.v2+json",
    //       "Content-Type": "application/json",
    //     };
    //     let fileContent = {
    //       targetAppsToFill: "131",
    //       lsoaCodes: {
    //         E01000005: {
    //           IMD_DECILE: "3",
    //           FORECAST_UPTAKE: "1",
    //         },
    //         E01004294: {
    //           IMD_DECILE: "5",
    //           FORECAST_UPTAKE: "1",
    //         },
    //         E01032767: {
    //           IMD_DECILE: "7",
    //           FORECAST_UPTAKE: "1",
    //         },
    //         E01032739: {
    //           IMD_DECILE: "7",
    //           FORECAST_UPTAKE: "1",
    //         },
    //         E01004293: {
    //           IMD_DECILE: "8",
    //           FORECAST_UPTAKE: "1",
    //         },
    //       },
    //     };
    //     let config = { headers: headers };
    //     let response = axios.post(fullUrl, fileContent).then((response) => {
    //       console.log(response.data)
    //     });
    // }
    if (this.state.rangeSelection !== prevState.rangeSelection || this.state.postcode !== prevState.postcode) {
      // placeholder postcode as the clinic postcode is generated off of random string
      // therefore there is no guarantee that the postcode actually exists
      const postcodeHolder = "SW1A 2AA" // const clinicPostcode = this.state.postcode
      axios
        .get(
          `https://vknseewvml.execute-api.eu-west-2.amazonaws.com/dev/get-lsoa-in-range?clinicPostcode=${postcodeHolder}&miles=${this.state.rangeSelection}`
        )
        .then((response) => {
          this.setState({
            lsoaInRange: response.data.sort((a, b) => a.IMD_DECILE?.N - b.IMD_DECILE?.N)
          })
        })
    }
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
      targetFillToInputValue,
      appsToFill,
      lsoaInRange,
      checkAll
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
          targetFillToInputValue={targetFillToInputValue}
          appsToFill={appsToFill}
          onTargetFillToInputChangeHandler={this.onTargetFillToInputChangeHandler}
          onClickTargetAppsToFillHandler={this.onClickTargetAppsToFillHandler}
          lsoaInRange={lsoaInRange}
          checkAll={checkAll}
          onClickChangeClinicHandler={this.onClickChangeClinicHandler}
          onChangeSelectedClinicHandler={this.onChangeSelectedClinicHandler}
          checkAllHandler={this.checkAllHandler}
          handleRangeSelection={this.handleRangeSelection}
          onClickLsoaCodesAppsToFillHandler={this.onClickLsoaCodesAppsToFillHandler}
          isCheckedLsoaHandler={this.isCheckedLsoaHandler}
        />
      </div>
    );
  }
}

export default ClinicInformation;
