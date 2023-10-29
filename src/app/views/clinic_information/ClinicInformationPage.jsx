import "../../styles/css/sass.css";
import React from "react";
import ClinicDetailsTable from "./ClinicDetailsTable";
import WeeklyCapacityTable from "./WeeklyCapacityTable";
import RecentInvitationHistory from "./RecentInvitationHistory";
import ClinicInvitationCriteria from "./clinic_invitation_criteria/ClinicInvitationCriteria";
import LsoaTable from "./LsoaTable";

export default function ClinicInformationPage(props) {
  const {
    clinicList,
    clinicName,
    address1,
    address2,
    postcode,
    weeklyCapacity,
    lastUpdated,
    displayClinicSelector,
    cancelChangeText,
    recentInvitationHistory,
    onClickChangeClinicHandler,
    onChangeSelectedClinicHandler,
    displayUserErrorTargetPercentage,
    targetFillToInputValue,
    appsToFill,
    onClickTargetAppsToFillHandler,
    onTargetFillToInputChangeHandler,
    lsoaList,
    lsoaInRange,
    checkAll,
    checkAllHandler,
    handleSelection
  } = props;

  return (
    <div class="nhsuk-width-container ">
      <main class="nhsuk-main-wrapper " id="clinicSummary" role="main">
        <div class="nhsuk-grid-row">
          <div class="nhsuk-back-link">
            <a class="nhsuk-back-link__link" href="#">
              <svg
                class="nhsuk-icon nhsuk-icon__chevron-left"
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
          <h1 label="header">Clinic Invitations</h1>
          <p>
            View appointment availability, and set criteria to generate new
            invitations for a clinic.
          </p>
          <br />
          <div class="nhsuk-grid-column-two-thirds">
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
            <br />
            {displayClinicSelector ? (
              <div class="nhsuk-form-group">
                <label class="nhsuk-label">
                  Select another clinic from the same ICB
                </label>
                <select
                  class="nhsuk-select"
                  id="clinic-selector"
                  value={clinicName}
                  onChange={(e) => {
                    onChangeSelectedClinicHandler(e);
                  }}
                >
                  {clinicList.map((clinic) => {
                    return (
                      <option value={clinic.clinicName}>
                        {clinic.clinicName}
                      </option>
                    );
                  })}
                </select>
              </div>
            ) : null}
            <br />
          </div>
          <div class="nhsuk-grid-column-full">
            <WeeklyCapacityTable
              weeklyCapacity={weeklyCapacity}
              lastUpdated={lastUpdated}
            />
          </div>
          <br />
          <RecentInvitationHistory props={recentInvitationHistory} />
          <ClinicInvitationCriteria
            displayUserErrorTargetPercentage={displayUserErrorTargetPercentage}
            targetFillToInputValue={targetFillToInputValue}
            appsToFill={appsToFill}
            onTargetFillToInputChangeHandler={onTargetFillToInputChangeHandler}
            onClickTargetAppsToFillHandler={onClickTargetAppsToFillHandler}
          />
          <div class="nhsuk-grid-column-full">
            <LsoaTable
              lsoaInRange={lsoaInRange}
              checkAll={checkAll}
              checkAllHandler={checkAllHandler}
              handleSelection={handleSelection}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
