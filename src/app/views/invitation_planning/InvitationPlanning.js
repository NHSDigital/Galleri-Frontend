import { Component } from "react";
import { getInvitationPlanningData, getNationalForecastData } from '../../services/invitation_planning/InvitationPlanningService'
import InvitationPlanningPage from "./InvitationPlanningPage";

// Invitation Planning container
class InvitationPlanning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "quintileValues" : {},
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
    this.onCancelSaveHandler = this.onCancelSaveHandler.bind(this);

    this.onAmendForecastHandler = this.onAmendForecastHandler.bind(this);
    this.onSaveForecastHandler = this.onSaveForecastHandler.bind(this);
    this.onUptakeChangeHandler = this.onUptakeChangeHandler.bind(this)
    this.onCancelSaveForecastHandler = this.onCancelSaveForecastHandler.bind(this)
  }


  onQuintileChangeHandler(e, quintile) {
    let localQuintile = this.state.quintileValues
    localQuintile[`${quintile}`] = e.target.value
    this.setState({
      quintileValues: localQuintile
    })
  }

  onAmendFillHandler(e) {
    if (this.state.enableFillEdit) {
      if (this.sumQuintiles(this.state.quintileValues) === 100) {
        this.setState({
          enableFillEdit: !this.state.enableFillEdit,
          isCorrectTotal: true
        })
      } else {
        this.setState({
          isCorrectTotal: false
        })
      }
    }
    else {
      this.setState({
        enableFillEdit: !this.state.enableFillEdit
      })
    }
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

  onSaveForecastHandler(value){
    this.toggleUptakeEdit(false)
    this.setState({
      nationalUptakePercentage: value,
    })
  }

  sumQuintiles(quintileValues) {
    return Object.values(quintileValues).reduce((acc, cur) =>
        acc + Number(cur)
    , 0)
  }

  onCancelSaveHandler() {
    // do api call to retrieve previous value
    const {
      quintile,
      lastUpdatedQuintile,
      userName
    } = getInvitationPlanningData()

    this.setState({
      quintileValues: quintile,
      lastUpdatedQuintile: lastUpdatedQuintile,
      userName: userName,
      enableFillEdit: !this.state.enableFillEdit,
      isCorrectTotal: true
    })
  }

  onCancelSaveForecastHandler() {
    this.toggleUptakeEdit(false);
    this.setState({
      nationalUptakePercentage: this.state.nationalUptakePercentagePrevious,
    })
  }

  onUptakeChangeHandler(e) {
    this.setState({
      nationalUptakePercentage: e.target.value
    })
  }

  componentDidMount() {
    // API call
    const {
      quintile,
      lastUpdatedQuintile,
      userName
    } = getInvitationPlanningData()

    const nationalUptakePercentageCall = getNationalForecastData()

    this.setState({
      quintileValues: quintile,
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
          onCancelSaveHandler={this.onCancelSaveHandler}
          onAmendForecastHandler={this.onAmendForecastHandler}
          onUptakeChangeHandler={this.onUptakeChangeHandler}
          onCancelSaveForecastHandler={this.onCancelSaveForecastHandler}
          onSaveForecastHandler={this.onSaveForecastHandler}
        />
      </div>
    )
  }
}

export default InvitationPlanning;
