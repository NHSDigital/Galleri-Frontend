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
import Header from "@/app/components/Header";

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
        `https://z5ks8p0buh.execute-api.eu-west-2.amazonaws.com/dev/clinic-summary-list?participatingIcb=${this.context.state.icbSelected}`
      )
      .then((response) => {
        this.context.setState({
          clinicList: response.data,
          lastUpdated: (new Date((response.data[0].UpdatedDate?.S))).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).replace(/ at/g, ',')
        });
      });
  }

  async onIcbChangeHandler(e) {
    await this.context.setState({
      icbSelected: e.target.value.replace('Participating ICB ', ''),
      participatingICBSelected: e.target.value
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
    this.context.setState({
      "navigateToClinic": true,
      clinicIdSelected: e.ClinicId.S,
      clinicNameSelected: e.ClinicName.S,
      currentlySelectedClinic: e.ClinicName.S
    })
    // Scroll to the top of the page every time it renders the page
    window.scrollTo(0, 0);
  }


  async componentDidMount() {
    try {
      // API call
      const { lastUpdated, clinicList } = getClinicData();

      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
      axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
      // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
      const response = await axios.get(`https://mxtf0w9wq9.execute-api.eu-west-2.amazonaws.com/dev/participating-icb-list`);

      // Update the state
      this.context.setState({
        icbData: [...response.data],
        // lastUpdated: lastUpdated,
        clinicList: clinicList,
      });

      this.setState({ isInitialLoad: false });
    } catch (error) {
      // Handle errors
      console.error("Error in componentDidMount:", error);
    }
  }

  render() {
    const {
      icbData,
      icbSelected,
      clinicList,
      lastUpdated,
      displayClinicsNoApp,
      participatingICBSelected
    } = this.context.state;

    // Check if the context state variables are available
    const isContextLoaded =
      icbData.length > 1;

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

    return (
      <div>
        <Header/>
        {
          // Check if a clinic link has been clicked
          // If clicked render the clinic information page and pass the props
          // Also added conditional rendering to ensure that the page is rendered only after certain context state variables are loaded
          !this.context.state.navigateToClinic ? (
            isContextLoaded && (
              <ClinicSummaryPage
                icbData={icbData}
                icbSelected={icbSelected}
                participatingICBSelected={participatingICBSelected}
                clinicList={filterClinicListApps}
                lastUpdated={lastUpdated}
                displayClinicsNoApp={displayClinicsNoApp}
                onIcbChangeHandler={this.onIcbChangeHandler}
                onCheckHandler={this.onCheckHandler}
                onClickClinicHandler={this.onClickClinicHandler}
              />
            )
          ) : (
            <div>
              <ClinicInformation />
            </div>
          )
        }
      </div>
    );
  }
}

ClinicSummary.contextType = AppStateContext;
