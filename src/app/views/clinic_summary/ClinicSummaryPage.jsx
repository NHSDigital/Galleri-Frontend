import "../../styles/css/sass.css";
import React, { Component } from "react";
import ClinicSummaryTable from "./ClinicSummaryTable";

export default function ClinicSummaryPage(props) {
  const {
    icbData,
    icbSelected,
    participatingICBSelected,
    lastUpdated,
    clinicList,
    onIcbChangeHandler,
    onCheckHandler,
    onClickClinicHandler,
  } = props;

  // Check if all the listed context state variables are available
  const isContextLoaded = clinicList.length > 0;

  console.log("icbData....", icbData);
  console.log("participatingICBSelected....", participatingICBSelected);

  return (
    <div class="nhsuk-width-container ">
      <main class="nhsuk-main-wrapper " id="clinicSummary" role="main">
        <div class="nhsuk-grid-row">
          <h1 label="header">Clinic Summary</h1>
          <div class="nhsuk-u-reading-width">
            <p>
              Summarises how many appointments remain available over the next 6
              weeks, how many invitations have been generated and when.
            </p>
            <div class="nhsuk-form-group">
              <label class="nhsuk-label" for="select-1">
                Select the participating integrated care board (ICB)
              </label>
              <select
                class="nhsuk-select"
                id="select-icb"
                name="select-icb"
                onChange={(e) => onIcbChangeHandler(e)}
              >
                <option value={participatingICBSelected}></option>
                {icbData.map((icb, key) => {
                  return (
                    <option key={key}>{"Participating ICB " + icb}</option>
                  );
                })}
              </select>
            </div>
            <br />
          </div>
          {icbSelected === ""
            ? null
            : isContextLoaded && (
                <ClinicSummaryTable
                  lastUpdated={lastUpdated}
                  clinicList={clinicList}
                  onCheckHandler={onCheckHandler}
                  onClickClinicHandler={onClickClinicHandler}
                />
              )}
        </div>
      </main>
      {console.log("End of Summary Page ......")}
    </div>
  );
}
