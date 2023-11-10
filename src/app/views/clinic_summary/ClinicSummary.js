import { Component } from "react";
import ClinicSummaryPage from './ClinicSummaryPage';
import ClinicInformation from "../clinic_information/ClinicInformation";
import { getClinicData } from '../../services/ClinicSummaryService';
import { AppStateContext } from "@/app/context/AppStateContext";
import {
  filterClinicsByIcb,
  filterClinicsNoAppointments,
  daysSinceLastInvite,
} from './helper';
import axios from 'axios';

// Clinic Summary container
export default class ClinicSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isInitialLoad: true,
    };

    // Handlers
    this.onIcbChangeHandler = this.onIcbChangeHandler.bind(this);
    this.onCheckHandler = this.onCheckHandler.bind(this);
    this.onClickClinicHandler = this.onClickClinicHandler.bind(this);
  }

  getClinicsFromIcbCode() {
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    axios
      .get(
        `https://167avm4gy0.execute-api.eu-west-2.amazonaws.com/dev/clinic-summary-list?participatingIcb=${this.context.state.icbSelected}`
      )
      .then((response) => {
        this.context.setState({
          clinicList: response.data,
        });
      });
  }

  async onIcbChangeHandler(e) {
    await this.context.setState({
      icbSelected: e.target.value.replace('Participating ICB ', '')
    });
    this.getClinicsFromIcbCode();
    this.setState({ loading: false });
  }

  onCheckHandler(e) {
    this.context.setState({
      displayClinicsNoApp: e.target.checked,
    });
  }

  onClickClinicHandler(event, e) {
    console.log(e.ClinicId.S, e.ClinicName.S);
    console.log(event.target.id);
    this.context.setState({
      "navigateToClinic": true,
      clinicIdSelected: e.ClinicId.S,
      clinicNameSelected: e.ClinicName.S,
      currentlySelectedClinic: e.ClinicName.S
    })
  }


  async componentDidMount() {
    try {
      // API call
      const { lastUpdated, clinicList } = getClinicData();

      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
      // axios
      //   .get(
      //     `https://45arj8wtdk.execute-api.eu-west-2.amazonaws.com/dev/participating-icb-list`
      //   )
      //   .then((response) => {
      //     this.context.setState({
      //       icbData: [...this.context.state.icbData, ...response.data],
      //       lastUpdated: lastUpdated,
      //       clinicList: clinicList,
      //     }, () => { console.log(this.context.state.icbData) });
      //   });
      const response = await axios.get(`https://45arj8wtdk.execute-api.eu-west-2.amazonaws.com/dev/participating-icb-list`);

      // Update the state
      this.context.setState({
        icbData: [...this.context.state.icbData, ...response.data],
        lastUpdated: lastUpdated,
        clinicList: clinicList,
      }, () => { console.log(this.context.state.icbData) });

      this.setState({ isInitialLoad: false });
    } catch (error) {
      // Handle errors
      console.error("Error in componentDidMount:", error);
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   // Only allow re-render if it's not the initial load or when yourStateVariable changes.
  //   const { isInitialLoad } = this.state;
  //   const { icbData, lastUpdated, clinicList } = this.context.state;

  //   const shouldUpdate =
  //     !nextState.isInitialLoad &&
  //     (nextState.icbData !== icbData ||
  //       nextState.lastUpdated !== lastUpdated ||
  //       nextState.clinicList !== clinicList);

  //   return shouldUpdate;
  // }

  render() {
    const {
      icbData,
      icbSelected,
      clinicList,
      lastUpdated,
      displayClinicsNoApp,
    } = this.context.state;

    const { loading } = this.state;

    let addDaysSinceLastInvite = daysSinceLastInvite(clinicList);

    let filteredClinicList = filterClinicsByIcb(
      addDaysSinceLastInvite,
      icbSelected,
      displayClinicsNoApp
    );

    let filterClinicListApps = filterClinicsNoAppointments(
      filteredClinicList,
      displayClinicsNoApp
    );
    console.log(this.state.isInitialLoad);

    return (
      <div>
        {
          // Check if a clinic link has been clicked
          !this.context.state.navigateToClinic ?
            <ClinicSummaryPage // Render the default page
              icbData={icbData}
              icbSelected={icbSelected}
              clinicList={filterClinicListApps}
              lastUpdated={lastUpdated}
              displayClinicsNoApp={displayClinicsNoApp}
              onIcbChangeHandler={this.onIcbChangeHandler}
              onCheckHandler={this.onCheckHandler}
              onClickClinicHandler={this.onClickClinicHandler}
              loading={loading}
            />
            :
            // If clicked render the clinic information page and pass the props
            // Pass the props this components required from this component.
            // My approach would be to create an object in state, package up all data needed for this component below
            // Unpack it within the component below.
            <div>
              <ClinicInformation />
            </div>
        }
      </div>
    );
  }
}

ClinicSummary.contextType = AppStateContext;
