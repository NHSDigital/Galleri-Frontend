import "../../styles/css/sass.css";
import React from "react";
import ClinicDetailsTable from "./ClinicDetailsTable";
import WeeklyCapacityTable from "./WeeklyCapacityTable";
import RecentInvitationHistory from "./RecentInvitationHistory";
import ClinicInvitationCriteria from "./clinic_invitation_criteria/ClinicInvitationCriteria";
import LsoaTable from "./LsoaTable";

export default function ClinicInformationPage(props) {
  const {
    clinicIdNameList,
    clinicName,
    address1,
    address2,
    postcode,
    weeklyCapacity,
    lastUpdated,
    displayClinicSelector,
    cancelChangeText,
    recentInvitationHistory,
    currentlySelectedClinic,
    onClickChangeClinicHandler,
    onChangeSelectedClinicHandler,
    onSubmitHandler,
    onClickGoBackLinkHandler,
    displayUserErrorTargetPercentage,
    displayViewAllPrevInvitations,
    targetFillToInputValue,
    appsToFill,
    lastSelectedRange,
    lsoaInRange,
    onClickTargetAppsToFillHandler,
    onTargetFillToInputChangeHandler,
    pageSize,
    currentPage,
    checkAllHandler,
    handleRangeSelection,
    lsoaCodesAppsToFill,
    checkRecord,
    onPageSizeChange,
    onCurrentPageChange,
  } = props;

  return (
    <div className="nhsuk-width-container ">
      <main className="nhsuk-main-wrapper " id="main-content" role="main">
        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            <div className="nhsuk-back-link">
              <a
                className="nhsuk-back-link__link"
                href="#"
                onClick={onClickGoBackLinkHandler}
              >
                <svg
                  className="nhsuk-icon nhsuk-icon__chevron-left"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="24"
                  width="24"
                >
                  <path d="M8.5 12c0-.3.1-.5.3-.7l5-5c.4-.4 1-.4 1.4 0s.4 1 0 1.4L10.9 12l4.3 4.3c.4.4.4 1 0 1.4s-1 .4-1.4 0l-5-5c-.2-.2-.3-.4-.3-.7z"></path>
                </svg>
                Go back
              </a>
            </div>
          </div>
          <div>
            {lsoaInRange.length === 0 ? (
              <div className="nhsuk-grid-column-two-thirds" style={{ "color": "#d5281b", "border": "5px solid", "text-align": "center", }}>
                <h2>No LSOA data is available</h2>
              </div>
            ) : ("")}
          </div>
          <div className="nhsuk-grid-column-two-thirds">
            <br />
            <h1 label="header">Clinic Invitations</h1>
            <p>
              View appointment availability, and set criteria to generate new
              invitations for a clinic.
            </p>
            <br />
          </div>
          <div className="nhsuk-grid-column-two-thirds">
            <h2 id="maincontent" label="header">
              Clinic Information
            </h2>
            <ClinicDetailsTable
              clinicName={clinicName}
              address1={address1}
              address2={address2}
              postcode={postcode}
              cancelChangeText={cancelChangeText}
              onClickChangeClinicHandler={onClickChangeClinicHandler}
            />
            {displayClinicSelector ? (
              <div className="nhsuk-form-group">
                <label className="nhsuk-label">
                  Select another clinic from the same ICB
                </label>
                <select
                  className="nhsuk-select"
                  id="clinic-selector"
                  value={currentlySelectedClinic}
                  onChange={(e) => {
                    onChangeSelectedClinicHandler(e);
                  }}
                >
                  {clinicIdNameList.map((clinic) => {
                    return (
                      <option value={clinic.clinicName}>
                        {clinic.clinicName}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : null}
          </div>
          <div className="nhsuk-grid-column-full  nhsuk-u-margin-bottom-3">
            <WeeklyCapacityTable
              weeklyCapacity={weeklyCapacity}
              lastUpdated={lastUpdated}
            />
          </div>
          <div className="nhsuk-grid-column-full  nhsuk-u-margin-bottom-3">
            <RecentInvitationHistory
              props={recentInvitationHistory}
              displayViewAllPrevInvitations={displayViewAllPrevInvitations}
            />
          </div>
          <ClinicInvitationCriteria
            displayUserErrorTargetPercentage={displayUserErrorTargetPercentage}
            targetFillToInputValue={targetFillToInputValue}
            appsToFill={appsToFill}
            onTargetFillToInputChangeHandler={onTargetFillToInputChangeHandler}
            onClickTargetAppsToFillHandler={onClickTargetAppsToFillHandler}
          />
          <div className="nhsuk-grid-column-full">
            <LsoaTable
              lsoaInRange={lsoaInRange}
              checkAllHandler={checkAllHandler}
              checkRecord={checkRecord}
              pageSize={pageSize}
              currentPage={currentPage}
              handleRangeSelection={handleRangeSelection}
              lsoaCodesAppsToFill={lsoaCodesAppsToFill}
              onSubmitHandler={onSubmitHandler}
              onPageSizeChange={onPageSizeChange}
              onCurrentPageChange={onCurrentPageChange}
              lastSelectedRange={lastSelectedRange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
