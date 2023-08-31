import { Component } from "react";
import { getInvitationPlanningData, getNationalForecastData } from '../../services/invitation_planning/InvitationPlanningService'
import InvitationPlanningPage from "./InvitationPlanningPage";

// Invitation Planning container
class InvitationPlanning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "quintileValues" : {},
      "quintileValuesPrevious" : {},
      "quintileValuesAux": {},
      "nationalUptakePercentage": '',
      "nationalUptakePercentagePrevious": '',
      "enableFillEdit": false,
      "lastUpdatedQuintile": '',
      "userName": '',
      "isCorrectTotal": true,
      "enableUptakeEdit": false,
      "isCorrectUptakeTotal": true
    };

    // Handlers
    this.onQuintileChangeHandler = this.onQuintileChangeHandler.bind(this);
    this.onAmendFillHandler = this.onAmendFillHandler.bind(this);
    this.onSaveFillHandler = this.onSaveFillHandler.bind(this);
    this.onCancelSaveFillHandler = this.onCancelSaveFillHandler.bind(this);

    this.onAmendForecastHandler = this.onAmendForecastHandler.bind(this);
    this.onUptakeChangeHandler = this.onUptakeChangeHandler.bind(this)
    this.onCancelSaveForecastHandler = this.onCancelSaveForecastHandler.bind(this)
  }

  sumQuintiles(quintileValues) {
    return Object.values(quintileValues).reduce((acc, cur) =>
        acc + Number(cur)
    , 0)
  }

  // toggle edit mode
  toggleFillEdit(toggle){
    this.setState({
      enableFillEdit: toggle
    })
  }

  displayFillError(toggle){
    this.setState({
      isCorrectTotal: toggle
    })
  }

  onQuintileChangeHandler(e, quintile) {
    console.log("qv state before = ", this.state.quintileValues)
    console.log(quintile)
    let localQuintile = this.state.quintileValues
    localQuintile[`${quintile}`] = Number(e.target.value)
    this.setState({
      quintileValuesAux: localQuintile
    })
    console.log("qv state after = ", this.state.quintileValues)
  }

  onAmendFillHandler() {
    this.toggleFillEdit(true)
    const prev = this.state.quintileValues
    this.setState({
      quintileValuesPrevious: prev
    })
  }

  onSaveFillHandler(){
    if (this.sumQuintiles(this.state.quintileValuesAux) === 100){
      this.setState({
        quintileValues: this.state.quintileValuesAux,
      })
      this.toggleFillEdit(false)
      this.displayFillError(true)
    } else {
      this.displayFillError(false)
    }
  }

  onCancelSaveFillHandler() {
    this.toggleFillEdit(false)
    this.setState({
      quintileValues: this.state.quintileValuesPrevious,
      isCorrectTotal: true
    })
  }

  // toggle edit mode
  toggleUptakeEdit(toggle){
    this.setState({
      enableUptakeEdit: toggle
    })
  }

  onAmendForecastHandler(value) {
    this.toggleUptakeEdit(true)
    this.setState({
      nationalUptakePercentagePrevious: value
    })
  }

  onUptakeChangeHandler(e) {
    this.setState({
      nationalUptakePercentage: e.target.value
    })
  }

  onSaveForecastHandler(value){
    this.toggleUptakeEdit(false)
    console.
    this.setState({
      nationalUptakePercentage: value,
    })
  }

  onCancelSaveForecastHandler() {
    this.toggleUptakeEdit(false);
    this.setState({
      nationalUptakePercentage: this.state.nationalUptakePercentagePrevious,
    })
  }


  componentDidMount() {
    // API call
    const {
      quintile,
      lastUpdatedQuintile,
      userName
    } = getInvitationPlanningData()
    // add object model
    const nationalUptakePercentageCall = getNationalForecastData()

    this.setState({
      quintileValues: quintile,
      quintileValuesAux: quintile,
      lastUpdatedQuintile: lastUpdatedQuintile,
      userName: userName,
      nationalUptakePercentage: nationalUptakePercentageCall.currentPercentage
    })
  }

  render() {
    const {
      quintileValues,
      enableFillEdit,
      lastUpdatedQuintile,
      userName,
      isCorrectTotal,
      nationalUptakePercentage,
      enableUptakeEdit,
      isCorrectUptakeTotal,
    } = this.state;
    // console.log("rendering quintileValues = ", this.state.quintileValues)
    // console.log("rendering quintileValuesAux = ", this.state.quintileValuesAux)
    // console.log("rendering quintileValuesPrevious = ", this.state.quintileValuesPrevious)
    return (
      <div>
        <InvitationPlanningPage
          quintileValues={quintileValues}
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
        />
      </div>
    )
  }
}

export default InvitationPlanning;
