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

  onQuintileChangeHandler(e, quintile) {
    let localQuintile = this.state.quintileValues
    localQuintile[`${quintile}`] = e.target.value
    this.setState({
      quintileValues: localQuintile
    })
  }

  onAmendFillHandler(e) {
    this.toggleFillEdit(true)

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

  onSaveFillHandler(value){
    this.toggleFillEdit(false)
    this.setState({
      quintileValues: 10
    })
  }

  onCancelSaveFillHandler() {
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
