import "../../styles/css/sass.css";
import React, { Component } from "react";
import ClinicSummaryTable from "./ClinicSummaryTable";
import pagination from "@/app/components/pagination";

export default function ClinicSummaryPage(props) {
  const {
    icbData,
    icbSelected,
    lastUpdated,
    clinicList,
    onIcbChangeHandler,
    onCheckHandler,
    onPrevHandler,
    onNextHandler,
  } = props;
  return (
    <div class="nhsuk-width-container ">
      <main class="nhsuk-main-wrapper " id="clinicSummary" role="main">
        <div class="nhsuk-grid-row">
          <div class="nhsuk-grid-column-two-thirds">
            <h1>Clinic Summary</h1>
            <h5>
              Summarises how many appointments are available over the next 6
              weeks, how many invitations have been sent and when these were
              most recently sent.
            </h5>
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
                {icbData.map((icb, key) => {
                  return <option key={key}>{icb.icbName}</option>;
                })}
              </select>
            </div>
            <br />
          </div>
          {icbSelected === "" ? null : (
            <div class="nhsuk-grid-column-full">
              <ClinicSummaryTable
                lastUpdated={lastUpdated}
                clinicList={clinicList}
                onCheckHandler={onCheckHandler}
                onPrevHandler={onPrevHandler}
                onNextHandler={onNextHandler}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
