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

  return (
    <div class="nhsuk-width-container">
      <main class="nhsuk-main-wrapper" id="main-content" role="main">
        <div class="nhsuk-grid-row">
        <div class="nhsuk-grid-column-full">
          <h1 aria-label="Clinic Summary">Clinic Summary</h1>
          <div class="nhsuk-u-reading-width nhsuk-u-margin-bottom-6">
            <p>
              Summarises how many appointments remain available over the next 6
              weeks, how many invitations have been generated and when.
            </p>
            <div class="nhsuk-form-group">
              <label class="nhsuk-label" for="select-icb">
                Select the participating integrated care board (ICB)
              </label>
              <select
                class="nhsuk-select"
                id="select-icb"
                name="select-icb"
                value={participatingICBSelected}
                autocomplete="off"
                onChange={(e) => onIcbChangeHandler(e)}
              >
                <option></option>
                {icbData.map((icb, key) => {
                  return (
                    <option key={key}>{"Participating ICB " + icb}</option>
                  );
                })}
              </select>
            </div>
          </div>
          <div aria-live="polite" id="dynamic-update-region">
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
        </div>
        </div>
      </main>
    </div>
  );
}
