import { Component } from "react";
import { getInvitationPlanningData } from '../../services/invitation_planning/InvitationPlanningService'
// import { filterClinicsByIcb } from './helper'
import InvitationPlanningPage from "./InvitationPlanningPage";

// Invitation Planning container
class InvitationPlanning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "quintileValues" : {
      },
      // "enableFillEdit": false,
      // "enableForecastEdit": false
    };

    // Handlers
    // this.onIcbChangeHandler = this.onIcbChangeHandler.bind(this);
    this.onAmmendFillHandler = this.onAmmendFillHandler.bind(this);
  }

  // onIcbChangeHandler(e) {
  //   this.setState({
  //     icbSelected: e.target.value
  //   });
  // }

  onAmmendFillHandler() {
    // console.log('event = ', e)
    this.setState({
      enableEdit: true
    })
  }

  onSaveFillHandler(e) {
    console.log('event = ', e)
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
      // enableFillEdit,
      // enableForecastEdit
    } = this.state;

    return (
      <div>
        <InvitationPlanningPage
          quintileValues={quintileValues}
          // onAmmendFillHandler={this.onAmmendFillHandler}
          // enableFillEdit={enableFillEdit}
          // enableForecastEdit={enableForecastEdit}
        />
      </div>
    )
  }
}

export default InvitationPlanning;
