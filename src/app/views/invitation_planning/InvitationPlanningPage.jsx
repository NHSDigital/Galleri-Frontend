import "../../styles/css/sass.css";
import React, { Component } from "react";
import NationalForecastUptakeTable from "./NationalForecastUptakeTable";
import QuintileTargetTable from "./QuintileTargetTable";


export default function InvitationPlanningPage(props) {
  const {
    quintileValues,
    onQuintileChangeHandler,
    onAmendFillHandler,
    enableFillEdit,
    onCancelSaveHandler,
    lastUpdatedQuintile,
    userName,
    isCorrectTotal
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

  const sumQuintiles = (quintileValues) => {
    return Object.values(quintileValues).reduce((acc, cur) =>
        acc + Number(cur)
    , 0)
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
                <div class="nhsuk-hint" id="last-updated-hint">
                  Last Updated: {lastUpdatedQuintile}
                </div>
                <div class="nhsuk-hint" id="last-updated-hint">
                  {userName}
                </div>
                { !isCorrectTotal &&
                  <div class="nhsuk-error-summary">
                    The fill targets must add up to 100%
                  </div>
                }
                <button class="nhsuk-button" onClick={(e) => onAmendFillHandler(e)}>
                  {changeText(enableFillEdit)}
                </button>
                <br/>
                { enableFillEdit &&
                  <button class="nhsuk-button:link" onClick={onCancelSaveHandler}>
                    Cancel without saving
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
