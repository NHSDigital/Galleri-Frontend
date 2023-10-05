import { Component } from "react";
import axios from 'axios';
import {
  getInvitationPlanningData,
  getNationalForecastData,
} from "../../services/invitation_planning/InvitationPlanningService";
import { QuintileTarget } from "@/app/models/invitation_planning/QuintileTarget";
import { NationalForecastUptake } from "@/app/models/invitation_planning/NationalForecastUptake";
import { sumQuintiles } from "./helper";
import InvitationPlanningPage from "./InvitationPlanningPage";

// Invitation Planning container
class InvitationPlanning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quintileValues: {},
      quintileValuesPrevious: {},
      quintileValuesAux: {},
      nationalUptakePercentage: "",
      nationalUptakePercentagePrevious: "",
      enableFillEdit: false,
      lastUpdatedQuintile: "",
      userName: "",
      isCorrectTotal: true,
      enableUptakeEdit: false,
      isCorrectUptakeTotal: true,
    };

    // Handlers
    this.onQuintileChangeHandler = this.onQuintileChangeHandler.bind(this);
    this.onAmendFillHandler = this.onAmendFillHandler.bind(this);
    this.onSaveFillHandler = this.onSaveFillHandler.bind(this);
    this.onCancelSaveFillHandler = this.onCancelSaveFillHandler.bind(this);

    this.onAmendForecastHandler = this.onAmendForecastHandler.bind(this);
    this.onUptakeChangeHandler = this.onUptakeChangeHandler.bind(this);
    this.onSaveForecastHandler = this.onSaveForecastHandler.bind(this);
    this.onCancelSaveForecastHandler =
      this.onCancelSaveForecastHandler.bind(this);

    // db write handlers
    this.putForecastUptakeAWSDynamo = this.putForecastUptakeAWSDynamo.bind();
    this.putQuintilesAWSDynamo = this.putQuintilesAWSDynamo.bind();
  }

  // DB actions
  async putForecastUptakeAWSDynamo(value) {
    console.log('write uptake to db -->' + value);
    axios.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    // axios
    //   .put(
    //     'https://wzn3cb86pf.execute-api.eu-west-2.amazonaws.com/dev/invitation-parameters-post-forecast-uptake',
    //     { forecastUptake: 989898989 }
    //   )
    //   .then((response) => {
    //     console.log('response -> ' + response.data);
    //   });
  //   axios({
  //     method: 'put',
  //     url: 'https://wzn3cb86pf.execute-api.eu-west-2.amazonaws.com/dev/invitation-parameters-post-forecast-uptake',
  //     data: {
  //         forecastUptake: 8989,
  //         status: 'success!'
  //     }
  // });
     const res = await axios.put('https://wzn3cb86pf.execute-api.eu-west-2.amazonaws.com/dev/invitation-parameters-post-forecast-uptake', { forecastUptake: 9090 });
  }

  putQuintilesAWSDynamo(values) {
    console.log('they are -> ' + JSON.stringify(values));
    console.log('write quintiles to db');
    axios.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    axios
      .put(
        'https://812potdz05.execute-api.eu-west-2.amazonaws.com/dev/invitation-parameters-post',
        {
          QUINTILE_1: values['0'],
          QUINTILE_2: values['1'],
          QUINTILE_3: quintiles['2'],
          QUINTILE_4: quintiles['3'],
          QUINTILE_5: quintiles['4'],
        }
      )
      .then((response) => {
        console.log('response -> ' + response.data);
      });
  }

  // toggle edit mode
  toggleFillEdit(toggle) {
    this.setState({
      enableFillEdit: toggle,
    });
  }

  displayFillError(toggle) {
    this.setState({
      isCorrectTotal: toggle,
    });
  }

  async onQuintileChangeHandler(e, quintile) {
    let localQuintile = {
      ...this.state.quintileValuesAux,
    };
    localQuintile[`${quintile}`] = Number(e.target.value);
    await this.setState({
      quintileValuesAux: localQuintile,
    });
  }

  onAmendFillHandler() {
    this.toggleFillEdit(true);
    const prev = this.state.quintileValues;
    this.setState({
      quintileValuesPrevious: prev,
    });
  }

  async onSaveFillHandler() {
    const quintileValues = this.state.quintileValuesAux;
    if (sumQuintiles(quintileValues) === 100) {
      await this.setState({
        quintileValues: quintileValues,
        quintileValuesPrevious: quintileValues,
      });
      this.toggleFillEdit(false);
      this.displayFillError(true);
      this.putQuintilesAWSDynamo(quintileValues);
    } else {
      this.displayFillError(false);
    }
  }

  onCancelSaveFillHandler() {
    this.toggleFillEdit(false);
    const prev = {
      ...this.state.quintileValuesPrevious,
    };
    this.setState({
      quintileValues: prev,
      quintileValuesAux: prev,
      isCorrectTotal: true,
    });
  }

  // toggle edit mode
  toggleUptakeEdit(toggle) {
    this.setState({
      enableUptakeEdit: toggle,
    });
  }

  displayUptakeError(toggle) {
    this.setState({
      isCorrectUptakeTotal: toggle,
    });
  }

  onAmendForecastHandler(value) {
    this.toggleUptakeEdit(true);
    this.setState({
      nationalUptakePercentagePrevious: value,
    });
  }

  onUptakeChangeHandler(e) {
    this.setState({
      nationalUptakePercentage: e.target.value,
    });
  }

  onSaveForecastHandler(value) {
    if (value <= 100) {
      this.setState({
        nationalUptakePercentage: value,
      });
      this.toggleUptakeEdit(false);
      this.displayUptakeError(true);
      this.putForecastUptakeAWSDynamo(value);
    } else {
      this.displayUptakeError(false);
    }
  }

  onCancelSaveForecastHandler() {
    this.toggleUptakeEdit(false);
    this.displayUptakeError(true);
    this.setState({
      nationalUptakePercentage: this.state.nationalUptakePercentagePrevious,
    });
  }

  componentDidMount() {
    // API call
    // const { quintile, lastUpdatedQuintile, userName } =
    //   getInvitationPlanningData();
    // const nationalUptakePercentageCall = getNationalForecastData();

    // Get quintiles and forecast uptake data
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    axios
      .get(
        "https://wzn3cb86pf.execute-api.eu-west-2.amazonaws.com/dev/invitation-parameters"
      )
      .then((response) => {
        console.log('response -> ' + response.data.NATIONAL_FORCAST_UPTAKE.N);
        const quintiles = [
          response.data.QUINTILE_1.N,
          response.data.QUINTILE_2.N,
          response.data.QUINTILE_3.N,
          response.data.QUINTILE_4.N,
          response.data.QUINTILE_5.N,
        ]
        const quintileData = new QuintileTarget(quintiles, Date('03/10/2023'), 'Username')
        this.setState({
          quintileValues: quintileData.quintile,
          quintileValuesAux: quintileData.quintile,
          quintileValuesPrevious: quintileData.quintile,
          lastUpdatedQuintile: quintileData.lastUpdatedQuintile,
          userName: quintileData.userName,
          nationalUptakePercentage: response.data.NATIONAL_FORCAST_UPTAKE.N,
        });
      });

  }

  render() {
    const {
      quintileValues,
      quintileValuesAux,
      enableFillEdit,
      lastUpdatedQuintile,
      userName,
      isCorrectTotal,
      nationalUptakePercentage,
      enableUptakeEdit,
      isCorrectUptakeTotal,
    } = this.state;

    return (
      <div>
        <InvitationPlanningPage
          quintileValues={quintileValues}
          quintileValuesAux={quintileValuesAux}
          enableFillEdit={enableFillEdit}
          lastUpdatedQuintile={lastUpdatedQuintile}
          userName={userName}
          isCorrectTotal={isCorrectTotal}
          nationalUptakePercentage={nationalUptakePercentage}
          enableUptakeEdit={enableUptakeEdit}
          isCorrectUptakeTotal={isCorrectUptakeTotal}
          onQuintileChangeHandler={this.onQuintileChangeHandler}
          onAmendFillHandler={this.onAmendFillHandler}
          onCancelSaveFillHandler={this.onCancelSaveFillHandler}
          onAmendForecastHandler={this.onAmendForecastHandler}
          onUptakeChangeHandler={this.onUptakeChangeHandler}
          onCancelSaveForecastHandler={this.onCancelSaveForecastHandler}
          onSaveForecastHandler={this.onSaveForecastHandler}
          onSaveFillHandler={this.onSaveFillHandler}
          sumQuintiles={sumQuintiles}
        />
      </div>
    );
  }
}

export default InvitationPlanning;
