// import React, { Component } from 'react';
// import ClinicInvitationCriteriaPage from "./ClinicInvitationCriteriaPage";


// class ClinicInvitationCriteria extends Component {
//   constructor() {
//     super();
//     this.state = {
//       "isInputTargetPercentageTotal" : true,
//       "isInputTargetPercentageExceed" : true,
//       "inputValue" : "",
//     };

//     this.onClickUpdateHandler = this.onClickUpdateHandler.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);

//   }

//   handleInputChange(e) {
//     this.setState({
//       inputValue: e.target.value,
//     });
//   }

//   onClickUpdateHandler() {
//     let value = inputValue;
//     if (value === "") {
//       this.setState({
//         isInputTargetPercentageTotal: false,
//       });
//     } else {
//       this.setState({
//         isInputTargetPercentageTotal: true,
//       });
//     }

//     if (value > 100) {
//       this.setState({
//         isInputTargetPercentageExceed: false,
//       });
//     } else {
//       this.setState({
//         isInputTargetPercentageExceed: true,
//       });
//     }
//   }

//   // onClickUpdateHandler = (value) => {
//   //   this.handleInputError(value);
//   // };


//   render() {
//     const {
//       isInputTargetPercentageTotal,
//       isInputTargetPercentageExceed,
//       inputValue,
//     } = this.state;


//     return (
//       <div>
//         <ClinicInvitationCriteriaPage
//           isInputTargetPercentageTotal={isInputTargetPercentageTotal}
//           isInputTargetPercentageExceed={isInputTargetPercentageExceed}
//           inputValue={inputValue}
//           handleInputChange={this.handleInputChange}
//           onClickUpdateHandler={this.onClickUpdateHandler}
//         />
//       </div>
//     );
//   }
// }

// export default ClinicInvitationCriteria;
