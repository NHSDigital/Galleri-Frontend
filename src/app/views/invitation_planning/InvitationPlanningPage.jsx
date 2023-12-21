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
    <div className="nhsuk-width-container ">
      <main
        className="nhsuk-main-wrapper "
        id="invitationsParameters"
        role="main"
      >
        <div id="error-summary" tabIndex="0">
          {(!isCorrectUptakeTotal || !isCorrectTotal) && (
            <Errorinvitations
              onKeyUp={onKeyUp}
              isCorrectTotal={isCorrectTotal}
              isCorrectUptakeTotal={isCorrectUptakeTotal}
            />
          )}
        </div>
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <h1 aria-label="Invitation Variables">Invitation variables</h1>
            <p className="nhsuk-body-l nhsuk-u-margin-bottom-8">
              The forecasted national uptake and quintile fill targets can be
              amended if necessary.
            </p>
            <div
              className="nhsuk-grid-column-one-half"
              style={{ padding: "0px" }}
            >
              <div className="nhsuk-card" id="forecastTableContainer">
                <div
                  style={{
                    "padding-top": "24px",
                    "padding-left": "40px",
                    "padding-right": "80px",
                  }}
                >
                  <NationalForecastUptakeTable
                    nationalUptakePercentage={nationalUptakePercentage}
                    onUptakeChangeHandler={onUptakeChangeHandler}
                    enableUptakeEdit={enableUptakeEdit}
                    isCorrectUptakeTotal={isCorrectUptakeTotal}
                  />
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
                  {enableUptakeEdit ? (
                    <>
                      <div>
                        <button
                          className="nhsuk-button"
                          onClick={() =>
                            onSaveForecastHandler(nationalUptakePercentage)
                          }
                        >
                          Save changes
                        </button>
                      </div>
                      <div className="nhsuk-u-margin-bottom-4">
                        <a
                          className="nhsuk-action-link__link:hover .nhsuk-action-link__text"
                          href={null}
                          onClick={() => onCancelSaveForecastHandler()}
                          style={{
                            border: "24px",
                            "text-decoration": "underline",
                            cursor: "pointer",
                          }}
                        >
                          Cancel without saving
                        </a>
                      </div>
                    </>
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
                    "padding-right": "80px",
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
                  {enableFillEdit ? (
                    <>
                      <div>
                        <button
                          className="nhsuk-button"
                          onClick={() => onSaveFillHandler(quintileValues)}
                        >
                          Save changes
                        </button>
                      </div>
                      <div className="nhsuk-u-margin-bottom-4">
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
                      </div>
                    </>
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
