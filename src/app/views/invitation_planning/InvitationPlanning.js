import { Component } from "react";
import { getInvitationPlanningData } from '../../services/invitation_planning/InvitationPlanningService'
import InvitationPlanningPage from "./InvitationPlanningPage";

// Invitation Planning container
class InvitationPlanning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "quintileValues" : {
      },
      "enableFillEdit": false,
      "lastUpdatedQuintile": '',
      "userName": '',
      "isCorrectTotal": true
      // "enableForecastEdit": false
    };

    // Handlers
    this.onQuintileChangeHandler = this.onQuintileChangeHandler.bind(this);
    this.onAmendFillHandler = this.onAmendFillHandler.bind(this);
    this.onCancelSaveHandler = this.onCancelSaveHandler.bind(this);
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
    // if in edit mode
    // check to see if the total adds to 100
    // only set state if does otherwise send flag downstream
    // else switch state
    else {
      this.setState({
        enableFillEdit: !this.state.enableFillEdit
      })
    }
  }

  sumQuintiles(quintileValues) {
    return Object.values(quintileValues).reduce((acc, cur) =>
        acc + Number(cur)
    , 0)
  }

  onCancelSaveHandler() {
    const {
      quintile,
      lastUpdatedQuintile,
      userName
    } = getInvitationPlanningData()

    this.setState({
      quintileValues: quintile,
      lastUpdatedQuintile: lastUpdatedQuintile,
      userName: userName,
      enableFillEdit: !this.state.enableFillEdit
    })
  }

  componentDidMount() {
    // API call
    const {
      quintile,
      lastUpdatedQuintile,
      userName
    } = getInvitationPlanningData()

    this.setState({
      quintileValues: quintile,
      lastUpdatedQuintile: lastUpdatedQuintile,
      userName: userName
    })
  }

  render() {
    const {
      quintileValues,
      enableFillEdit,
      lastUpdatedQuintile,
      userName,
      isCorrectTotal
      // enableForecastEdit
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
          // enableForecastEdit={enableForecastEdit}
        />
      </div>
    )
  }
}

export default InvitationPlanning;
