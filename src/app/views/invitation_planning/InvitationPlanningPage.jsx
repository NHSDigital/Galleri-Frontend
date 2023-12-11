import "../../styles/css/sass.css";
import React from "react";
import NationalForecastUptakeTable from "./NationalForecastUptakeTable";
import QuintileTargetTable from "./QuintileTargetTable";
import Errorinvitations from "./ErrorInvitations";

export default function InvitationPlanningPage(props) {
  const {
    quintileValues,
    quintileValuesAux,
    onQuintileChangeHandler,
    onAmendFillHandler,
    onSaveFillHandler,
    enableFillEdit,
    onCancelSaveFillHandler,
    lastUpdatedQuintile,
    userName,
    isCorrectTotal,
    nationalUptakePercentage,
    enableUptakeEdit,
    onAmendForecastHandler,
    onUptakeChangeHandler,
    isCorrectUptakeTotal,
    onCancelSaveForecastHandler,
    onSaveForecastHandler,
    sumQuintiles,
    onKeyUp,
  } = props;

  return (
    <div class="nhsuk-width-container ">
      <main class="nhsuk-main-wrapper " id="invitationsParameters" role="main">
        <div id="error-summary">
            {(!isCorrectUptakeTotal||!isCorrectTotal) && (
              <Errorinvitations
                onKeyUp={onKeyUp}
                isCorrectTotal={isCorrectTotal}
                isCorrectUptakeTotal={isCorrectUptakeTotal}
              />
            )}
        </div>
        <div class="nhsuk-grid-row">
          <div class="nhsuk-grid-column-full">
            <h1>Invitation variables</h1>
            <h5 style={{ "font-weight": "normal" }}>
              The forecasted national uptake and quintile fill targets can be
              amended if necessary.
            </h5>
            <div class="nhsuk-grid-column-one-half" style={{ padding: "0px" }}>
              <div class="nhsuk-card" id="forecastTableContainer">
                <div
                  style={{
                    "padding-top": "24px",
                    "padding-left": "40px",
                    "padding-right": "40px",
                  }}
                >
                  
                  <NationalForecastUptakeTable
                    nationalUptakePercentage={nationalUptakePercentage}
                    onUptakeChangeHandler={onUptakeChangeHandler}
                    enableUptakeEdit={enableUptakeEdit}
                    isCorrectUptakeTotal={isCorrectUptakeTotal}
                  />
                  <br />
                  <div
                    class="nhsuk-hint"
                    id="last-updated-hint"
                    style={{ textAlign: "right", "margin-bottom": "2px" }}
                  >
                    Last Updated: {lastUpdatedQuintile}
                  </div>
                  <div
                    class="nhsuk-hint"
                    id="last-updated-hint"
                    style={{ textAlign: "right" }}
                  >
                    {userName}
                  </div>
                  
                  {enableUptakeEdit ? (
                    <div>
                      <button
                        class="nhsuk-button"
                        onClick={() =>
                          onSaveForecastHandler(nationalUptakePercentage)
                        }
                      >
                        Save changes
                      </button>
                      <br />
                      <a
                        class="nhsuk-action-link__link:hover .nhsuk-action-link__text"
                        onClick={() => onCancelSaveForecastHandler()}
                        style={{
                          border: "24px",
                          "text-decoration": "underline",
                          cursor: "pointer",
                        }}
                      >
                        Cancel without saving
                      </a>
                      <br />
                      <br />
                    </div>
                  ) : (
                    <button
                      class="nhsuk-button"
                      onClick={() =>
                        onAmendForecastHandler(nationalUptakePercentage)
                      }
                    >
                      Amend forecast uptake
                    </button>
                  )}
                </div>
              </div>
              <div class="nhsuk-card" id="quintileTableContainer">
                <div
                  style={{
                    "padding-top": "24px",
                    "padding-left": "40px",
                    "padding-right": "40px",
                  }}
                >
                  <QuintileTargetTable
                    quintileValues={quintileValues}
                    quintileValuesAux={quintileValuesAux}
                    onQuintileChangeHandler={onQuintileChangeHandler}
                    enableFillEdit={enableFillEdit}
                    sumQuintiles={sumQuintiles}
                    isCorrectTotal={isCorrectTotal}
                  />
                  <br />
                  <div
                    class="nhsuk-hint"
                    id="last-updated-hint"
                    style={{ textAlign: "right", "margin-bottom": "2px" }}
                  >
                    Last Updated: {lastUpdatedQuintile}
                  </div>
                  <div
                    class="nhsuk-hint"
                    id="last-updated-hint"
                    style={{ textAlign: "right" }}
                  >
                    {userName}
                  </div>
                  
                  {enableFillEdit ? (
                    <div>
                      <button
                        class="nhsuk-button"
                        onClick={() => onSaveFillHandler(quintileValues)}
                      >
                        Save changes
                      </button>
                      <br />
                      <a
                        class="nhsuk-action-link__link:hover .nhsuk-action-link__text"
                        onClick={() => onCancelSaveFillHandler()}
                        style={{
                          border: "24px",
                          "text-decoration": "underline",
                          cursor: "pointer",
                        }}
                      >
                        Cancel without saving
                      </a>
                      <br />
                      <br />
                    </div>
                  ) : (
                    <button
                      class="nhsuk-button"
                      onClick={() => onAmendFillHandler()}
                    >
                      Amend fill target
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
