import "../../styles/css/sass.css";
import React, { Component } from "react";
import ClinicSummaryTable from "./ClinicSummaryTable";
import { useInactivity } from "@/app/context/AutoSignOutProvider";
import LoggedOut from "../logged_out/LoggedOut";

export default function ClinicSummaryPage(props) {
  const {
    icbData,
    icbSelected,
    participatingICBSelected,
    lastUpdated,
    clinicList,
    pageSize,
    currentPage,
    onIcbChangeHandler,
    onCheckHandler,
    onClickClinicHandler,
    onPageSizeChange,
    onCurrentPageChange,
  } = props;

  const { showLogoutPage } = useInactivity();

  // Check if all the listed context state variables are available
  const isContextLoaded = clinicList.length > 0;

  return !showLogoutPage ? (
    <div className="nhsuk-width-container">
      <main className="nhsuk-main-wrapper" id="main-content" role="main">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <h1 aria-label="Clinic Summary">Clinic Summary</h1>
            <div className="nhsuk-u-reading-width nhsuk-u-margin-bottom-6">
              <p>
                Summarises how many appointments remain available over the next
                6 weeks, how many invitations have been generated and when.
              </p>
              <div className="nhsuk-form-group">
                <label className="nhsuk-label" for="select-icb">
                  Select the participating integrated care board (ICB)
                </label>
                <select
                  className="nhsuk-select"
                  id="select-icb"
                  name="select-icb"
                  value={participatingICBSelected}
                  autoComplete="off"
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
            {icbSelected === ""
              ? null
              : isContextLoaded && (
                  <ClinicSummaryTable
                    lastUpdated={lastUpdated}
                    clinicList={clinicList}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onCheckHandler={onCheckHandler}
                    onClickClinicHandler={onClickClinicHandler}
                    onPageSizeChange={onPageSizeChange}
                    onCurrentPageChange={onCurrentPageChange}
                  />
                )}
          </div>
        </div>
      </main>
    </div>
  ) : (
    <LoggedOut showHeader={false} />
  );
}
