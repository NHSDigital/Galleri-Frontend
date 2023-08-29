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
      "text": "Amend fill target"
      // "enableForecastEdit": false
    };

    // Handlers
    this.onQuintileChangeHandler = this.onQuintileChangeHandler.bind(this);
    this.onAmendFillHandler = this.onAmendFillHandler.bind(this);
  }


  onQuintileChangeHandler(e, quintile) {
    let localQuintile = this.state.quintileValues
    localQuintile[`${quintile}`] = e.target.value
    this.setState({
      quintileValues: localQuintile
    })
  }

  onAmendFillHandler() {
    this.setState({
      enableFillEdit: !this.state.enableFillEdit
    })
    changeText(enableFillEdit)
  }

  changeText(enableFillEdit) {
    if (enableFillEdit) {
      this.setState({
        text: "Save changes"
      })
    }
    else {
      this.setState({
        text: "Amend fill target"
      })
    }
  }

  onSaveFillHandler(e) {
    this.setState({
      saveFill: e.target
    })
  }

  componentDidMount() {
    // API call
    this.setState({
      quintileValues: getInvitationPlanningData()
    })
  }

  render() {
    const {
      quintileValues,
      enableFillEdit
      // enableForecastEdit
    } = this.state;

    return (
      <div>
        <InvitationPlanningPage
          quintileValues={quintileValues}
          onQuintileChangeHandler={this.onQuintileChangeHandler}
          onAmendFillHandler={this.onAmendFillHandler}
          enableFillEdit={enableFillEdit}
          // enableForecastEdit={enableForecastEdit}
        />
      </div>
    )
  }
}

export default InvitationPlanning;
