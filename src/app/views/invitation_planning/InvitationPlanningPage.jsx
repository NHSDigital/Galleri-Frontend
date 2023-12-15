import "../../styles/css/sass.css";
import React from "react";
import NationalForecastUptakeTable from "./NationalForecastUptakeTable";
import QuintileTargetTable from "./QuintileTargetTable";

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
  } = props;

  return (
    <div className="nhsuk-width-container ">
      <main className="nhsuk-main-wrapper " id="invitationsParameters" role="main">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <h1>Invitation variables</h1>
            <h5 style={{ "font-weight": "normal" }}>
              The forecasted national uptake and quintile fill targets can be
              amended if necessary.
            </h5>
            <div className="nhsuk-grid-column-one-half" style={{ padding: "0px" }}>
              <div className="nhsuk-card" id="forecastTableContainer">
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
                  />
                  <br />
                  <div
                    className="nhsuk-hint"
                    id="last-updated-hint"
                    style={{ textAlign: "right", "margin-bottom": "2px" }}
                  >
                    Last Updated: {lastUpdatedQuintile}
                  </div>
                  <div
                    className="nhsuk-hint"
                    id="last-updated-hint"
                    style={{ textAlign: "right" }}
                  >
                    {userName}
                  </div>
                  {!isCorrectUptakeTotal && (
                    <div className="nhsuk-error-summary">
                      The uptake percentage must be between 1% and 100%
                    </div>
                  )}
                  {enableUptakeEdit ? (
                    <div>
                      <button
                        className="nhsuk-button"
                        onClick={() =>
                          onSaveForecastHandler(nationalUptakePercentage)
                        }
                      >
                        Save changes
                      </button>
                      <br />
                      <a
                        className="nhsuk-action-link__link:hover .nhsuk-action-link__text"
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
                      className="nhsuk-button"
                      onClick={() =>
                        onAmendForecastHandler(nationalUptakePercentage)
                      }
                    >
                      Amend forecast uptake
                    </button>
                  )}
                </div>
              </div>
              <div className="nhsuk-card" id="quintileTableContainer">
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
                  />
                  <br />
                  <div
                    className="nhsuk-hint"
                    id="last-updated-hint"
                    style={{ textAlign: "right", "margin-bottom": "2px" }}
                  >
                    Last Updated: {lastUpdatedQuintile}
                  </div>
                  <div
                    className="nhsuk-hint"
                    id="last-updated-hint"
                    style={{ textAlign: "right" }}
                  >
                    {userName}
                  </div>
                  {!isCorrectTotal && (
                    <div className="nhsuk-error-summary">
                      The fill targets must add up to 100%
                    </div>
                  )}
                  {enableFillEdit ? (
                    <div>
                      <button
                        className="nhsuk-button"
                        onClick={() => onSaveFillHandler(quintileValues)}
                      >
                        Save changes
                      </button>
                      <br />
                      <a
                        className="nhsuk-action-link__link:hover .nhsuk-action-link__text"
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
                      className="nhsuk-button"
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
