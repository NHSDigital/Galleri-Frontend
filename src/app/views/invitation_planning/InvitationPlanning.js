import { Component } from "react";
import { getInvitationPlanningData, getNationalForecastData } from '../../services/invitation_planning/InvitationPlanningService'
import InvitationPlanningPage from "./InvitationPlanningPage";

// Invitation Planning container
class InvitationPlanning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "quintileValues" : {
      },
      "nationalUptakePercentage": '',
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

  onAmendForecastHandler(e) {
    if (this.state.enableUptakeEdit) {
      if (this.state.nationalUptakePercentage <= 100) {
        this.setState({
          enableUptakeEdit: !this.state.enableUptakeEdit,
          isCorrectUptakeTotal: true
        })
      } else {
        this.setState({
          isCorrectUptakeTotal: false
        })
      }
    }
    else {
      this.setState({
        enableUptakeEdit: !this.state.enableUptakeEdit,
      })
    }
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
    // do api call to retrieve previous value
    const uptakeCall = getNationalForecastData()

    this.setState({
      nationalUptakePercentage: uptakeCall.currentPercentage,
      enableUptakeEdit: !this.state.enableUptakeEdit,
      isCorrectUptakeTotal: true
    })
  }

  onUptakeChangeHandler(e) {
    this.setState({
      nationalUptakePercentage: Number(e.target.value)
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
      nationalUptakePercentage: nationalUptakePercentageCall
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
      isCorrectUptakeTotal
    } = this.state;

    return (
      <div>
        <InvitationPlanningPage
          quintileValues={quintileValues}
          onQuintileChangeHandler={this.onQuintileChangeHandler}
          onAmendFillHandler={this.onAmendFillHandler}
          enableFillEdit={enableFillEdit}
          onCancelSaveHandler={this.onCancelSaveHandler}
          lastUpdatedQuintile={lastUpdatedQuintile}
          userName={userName}
          isCorrectTotal={isCorrectTotal}
          nationalUptakePercentage={nationalUptakePercentage}
          enableUptakeEdit={enableUptakeEdit}
          onAmendForecastHandler={this.onAmendForecastHandler}
          onUptakeChangeHandler={this.onUptakeChangeHandler}
          isCorrectUptakeTotal={isCorrectUptakeTotal}
          onCancelSaveForecastHandler={this.onCancelSaveForecastHandler}
        />
      </div>
    )
  }
}

export default InvitationPlanning;
