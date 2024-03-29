"use client";
import { Component } from "react";
import { QuintileTarget } from "@/app/models/invitation_planning/QuintileTarget";
import { sumQuintiles } from "./helper";
import InvitationPlanningPage from "./InvitationPlanningPage";
import axios from "axios";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const INVITATION_PARAMETERS_PUT_FORECAST_UPTAKE =
  process.env.NEXT_PUBLIC_INVITATION_PARAMETERS_PUT_FORECAST_UPTAKE;
const INVITATION_PARAMETERS_PUT_QUINTILES =
  process.env.NEXT_PUBLIC_INVITATION_PARAMETERS_PUT_QUINTILES;
const INVITATION_PARAMETERS = process.env.NEXT_PUBLIC_INVITATION_PARAMETERS;
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT;

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

    this.onKeyUp = this.onKeyUp.bind(this);
  }

  // DB actions
  async putForecastUptakeAWSDynamo(value) {
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    await axios
      .put(
        `https://${INVITATION_PARAMETERS_PUT_FORECAST_UPTAKE}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/invitation-parameters-put-forecast-uptake`,
        { forecastUptake: Number(value) }
      )
      .then((response) => {});
  }

  async putQuintilesAWSDynamo(updatedQuintile) {
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    await axios
      .put(
        `https://${INVITATION_PARAMETERS_PUT_QUINTILES}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/invitation-parameters-put-quintiles`,
        { quintiles: updatedQuintile }
      )
      .then((response) => {});
  }

  // toggle edit mode
  toggleFillEdit(toggle) {
    this.setState({
      enableFillEdit: toggle,
    });
  }

  async displayFillError(toggle) {
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

  onKeyUp(e) {
    console.log("enter is pressed", e);
    if (e.key === "Enter" || e.keyCode === 32) {
      let errorContent = "";
      if (this.state.isCorrectUptakeTotal)
        errorContent = document.getElementById("uptake-error-message");
      else if (this.state.isCorrectTotal)
        errorContent = document.getElementById("quintile-error-message");
      if (errorContent) {
        errorContent.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
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
      await this.putQuintilesAWSDynamo(quintileValues);
    } else {
      await this.displayFillError(false);
      this.scrollToErrorContent();
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

  async displayUptakeError(toggle) {
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

  async onSaveForecastHandler(value) {
    if (value <= 100 && value > 0) {
      this.setState({
        nationalUptakePercentage: value,
      });
      this.toggleUptakeEdit(false);
      this.displayUptakeError(true);
      await this.putForecastUptakeAWSDynamo(value);
    } else {
      await this.displayUptakeError(false);
      this.scrollToErrorContent();
    }
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

    // Get quintiles and forecast uptake data
    axios.defaults.headers.post["Content-Type"] =
      "application/json;charset=utf-8";
    axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
    // TODO:Replace api id with latest api id from aws console until we get custom domain name set up
    axios
      .get(
        `https://${INVITATION_PARAMETERS}.execute-api.eu-west-2.amazonaws.com/${ENVIRONMENT}/invitation-parameters`
      )
      .then((response) => {
        const quintiles = [
          response.data.QUINTILE_1.N,
          response.data.QUINTILE_2.N,
          response.data.QUINTILE_3.N,
          response.data.QUINTILE_4.N,
          response.data.QUINTILE_5.N,
        ];
        const quintileData = new QuintileTarget(
          quintiles,
          Date("03/10/2023"),
          "Username"
        );
        this.setState({
          quintileValues: quintileData.quintile,
          quintileValuesAux: quintileData.quintile,
          quintileValuesPrevious: quintileData.quintile,
          lastUpdatedQuintile: quintileData.lastUpdatedQuintile,
          userName: quintileData.userName,
          nationalUptakePercentage: response.data.FORECAST_UPTAKE.N,
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
        <Header withNavigation={true} />
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
          onKeyUp={this.onKeyUp}
        />
        <Footer />
      </div>
    );
  }
}

export default InvitationPlanning;
