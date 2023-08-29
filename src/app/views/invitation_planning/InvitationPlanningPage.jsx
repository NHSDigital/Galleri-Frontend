import "../../styles/css/sass.css";
import React, { Component } from "react";
import NationalForecastUptakeTable from "./NationalForecastUptakeTable";
import QuintileTargetTable from "./QuintileTargetTable";


export default function InvitationPlanningPage(props) {
  const {
    // destructure props here
    quintileValues,
    onQuintileChangeHandler,
    onAmendFillHandler,
    enableFillEdit
    // enableForecastEdit
  } = props;

  const changeText = (enableFillEdit) => {
    if (enableFillEdit) {
      return "Save changes"
    }
    else {
      return "Amend fill target"
      }
  }

  return (
    <div class="nhsuk-width-container ">
      <main class="nhsuk-main-wrapper " id="clinicSummary" role="main">
        <div class="nhsuk-grid-row">
          <div class="nhsuk-grid-column-full">
            <h1>Invitation Variables</h1>
            <h5>
              The forecasted national uptake and quintile fill targets can be amended if necessary.
            </h5>
            <div class="nhsuk-grid-column-one-half">
              <div class="nhsuk-card">
                <NationalForecastUptakeTable/>
                <br/>
                <button class="nhsuk-button">
                  Amend forecast uptake
                </button>
              </div>
              <div class="nhsuk-card">
                <QuintileTargetTable
                  quintileValues={quintileValues}
                  onQuintileChangeHandler={onQuintileChangeHandler}
                  enableFillEdit={enableFillEdit}
                />
                <br/>
                <button class="nhsuk-button" onClick={onAmendFillHandler}>
                  {changeText(enableFillEdit)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
