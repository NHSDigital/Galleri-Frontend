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
        id="main-content"
        aria-labelledby="invitation-variables"
      >
        {(!isCorrectUptakeTotal || !isCorrectTotal) && (
          <div id="error-summary" tabIndex="0" role="alert">
            <Errorinvitations
              onKeyUp={onKeyUp}
              isCorrectTotal={isCorrectTotal}
              isCorrectUptakeTotal={isCorrectUptakeTotal}
            />
          </div>
        )}
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <h1 id="invitation-variables">Invitation variables</h1>
            <p className="nhsuk-body-l nhsuk-u-margin-bottom-8">
              The forecasted national uptake and quintile fill targets can be
              amended if necessary.
            </p>
            <div className="custom-nhsuk-grid-column-one-half">
              <div className="nhsuk-card" id="forecast-table-container">
                <div className="custom-invitation-variable-tables-paddings">
                  <NationalForecastUptakeTable
                    nationalUptakePercentage={nationalUptakePercentage}
                    onUptakeChangeHandler={onUptakeChangeHandler}
                    enableUptakeEdit={enableUptakeEdit}
                    isCorrectUptakeTotal={isCorrectUptakeTotal}
                  />
                  <div
                    className="nhsuk-hint nhsuk-u-margin-bottom-1"
                    id="last-updated-hint-national-forecast"
                  >
                    Last Updated: {lastUpdatedQuintile}
                  </div>
                  <div
                    className="nhsuk-hint"
                    id="last-updated-hint-user-forecast"
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
                          className="custom-invitation-variable-link"
                          href=""
                          onClick={(event) => {
                            event.preventDefault();
                            onCancelSaveForecastHandler();
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
                <div className="custom-invitation-variable-tables-paddings">
                  <QuintileTargetTable
                    quintileValues={quintileValues}
                    quintileValuesAux={quintileValuesAux}
                    onQuintileChangeHandler={onQuintileChangeHandler}
                    enableFillEdit={enableFillEdit}
                    sumQuintiles={sumQuintiles}
                    isCorrectTotal={isCorrectTotal}
                  />
                  <div
                    className="nhsuk-hint nhsuk-u-margin-bottom-1"
                    id="last-updated-hint-quintile"
                  >
                    Last Updated: {lastUpdatedQuintile}
                  </div>
                  <div
                    className="nhsuk-hint"
                    id="last-updated-hint-user-quintile"
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
                          className="custom-invitation-variable-link"
                          href=""
                          onClick={(event) => {
                            event.preventDefault();
                            onCancelSaveFillHandler();
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
