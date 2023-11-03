import "../../styles/css/sass.css";
import React from "react";

export default function InvitationSummaryPage(props) {
  const {
    clinicList,
    clinicName,
    address1,
    address2,
    postcode,
    weeklyCapacity,
    lastUpdated,
    displayClinicSelector,
    recentInvitationHistory,
    onChangeSelectedClinicHandler,
  } = props;

  const clinicNameHolder = `Phlebotomy clinic 5`;

  const addressHolder = `
West Hospital
Big Town
RG14 4RH
  `;

  const summaryList = {
    clinicDistanceHolder: "+ 5 miles",
    availableInvitationsHolder: "4,372",
    remainingAppointmentsHolder: "240",
    targetFillPercentageHolder: "50 %",
    targetAppointmentsToFillHolder: "120",
    expectedUptakeRateHolder: "24 %",
    invitationsToGenerateHolder: "500",
  };
  return (
    <div class="nhsuk-width-container ">
      <main class="nhsuk-main-wrapper " id="clinicSummary" role="main">
        <div class="nhsuk-grid-row">
          <div class="nhsuk-grid-column-full">
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
                Go back to clinic invitations
              </a>
            </div>
            <h1 label="header">Invitation summary</h1>
            <div class="nhsuk-inset-text">
              <span class="nhsuk-u-visually-hidden">Validation Alert: </span>
              <h3>Check these details before you generate invitations</h3>
            </div>
          </div>
          <div class="nhsuk-grid-column-two-thirds">
            <div
              class="nhsuk-error-summary nhsuk-u-padding-bottom-0"
              aria-labelledby="error-summary-title"
              role="alert"
              tabindex="-1"
            >
              <h2 class="nhsuk-error-summary__title nhsuk-u-margin-bottom-2" id="error-summary-title">
                There is a problem
              </h2>
              <div class="nhsuk-error-summary__body">
                <p>There are no invitations to generate</p>
              </div>
            </div>
            <p style={{ whiteSpace: "pre" }}>
              <strong>{clinicNameHolder}</strong>
              {addressHolder}
            </p>

            <dl
              id="summary-list-1"
              class="nhsuk-summary-list nhsuk-u-margin-bottom-9"
            >
              <div id="" class="nhsuk-summary-list__row">
                <dt
                  style={{ width: "350px" }}
                  id="term1-label"
                  class="nhsuk-summary-list__key"
                >
                  Distance from clinic
                </dt>
                <dd
                  id=""
                  class="nhsuk-summary-list__value nhsuk-u-padding-left-4"
                >
                  {summaryList.clinicDistanceHolder}
                </dd>
              </div>
              <div id="" class="nhsuk-summary-list__row">
                <dt id="term2-label" class="nhsuk-summary-list__key">
                  Total available to invite
                </dt>
                <dd
                  id=""
                  class="nhsuk-summary-list__value nhsuk-u-padding-left-4"
                >
                  {summaryList.availableInvitationsHolder}
                </dd>
              </div>
              <div id="" class="nhsuk-summary-list__row">
                <dt id="term3-label" class="nhsuk-summary-list__key">
                  Appointments remaining
                </dt>
                <dd
                  id=""
                  class="nhsuk-summary-list__value nhsuk-u-padding-left-4"
                >
                  {summaryList.remainingAppointmentsHolder}
                </dd>
              </div>
              <div id="" class="nhsuk-summary-list__row">
                <dt id="term4-label" class="nhsuk-summary-list__key">
                  Target percentage of appointments to fill
                </dt>
                <dd
                  id=""
                  class="nhsuk-summary-list__value nhsuk-u-padding-left-4"
                >
                  {summaryList.targetFillPercentageHolder}
                </dd>
              </div>
              <div id="" class="nhsuk-summary-list__row">
                <dt id="term5-label" class="nhsuk-summary-list__key">
                  Target number of appointments to fill
                </dt>
                <dd
                  id=""
                  class="nhsuk-summary-list__value nhsuk-u-padding-left-4"
                >
                  {summaryList.targetAppointmentsToFillHolder}
                </dd>
              </div>
            </dl>

            <dl
              id="summary-list-2"
              class="nhsuk-summary-list nhsuk-u-margin-bottom-8"
            >
              <div id="" class="nhsuk-summary-list__row">
                <dt
                  style={{ width: "350px" }}
                  id="term1-label"
                  class="nhsuk-summary-list__key"
                >
                  Overall expected uptake
                </dt>
                <dd
                  id=""
                  class="nhsuk-summary-list__value nhsuk-u-padding-left-4"
                >
                  {summaryList.expectedUptakeRateHolder}
                </dd>
              </div>
              <div id="" class="nhsuk-summary-list__row">
                <dt id="term2-label" class="nhsuk-summary-list__key">
                  Number of invitations to generate
                </dt>
                <dd
                  id=""
                  class="nhsuk-summary-list__value nhsuk-u-padding-left-4"
                >
                  {summaryList.invitationsToGenerateHolder}
                </dd>
              </div>
            </dl>

            <dl
              id="summary-list-2"
              class="nhsuk-summary-list nhsuk-u-margin-bottom-8"
            >
              <div id="" class="nhsuk-summary-list__row">
                <dt
                  style={{ width: "350px" }}
                  id="term1-label"
                  class="nhsuk-summary-list__key"
                >
                  Overall expected uptake
                </dt>
                <dd
                  id=""
                  class="nhsuk-summary-list__value nhsuk-u-padding-left-4"
                >
                  {summaryList.expectedUptakeRateHolder}
                </dd>
              </div>
              <div id="" class="nhsuk-summary-list__row">
                <dt id="term2-label" class="nhsuk-summary-list__key">
                  Number of invitations to generate
                </dt>
                <dd
                  id=""
                  class="nhsuk-summary-list__value nhsuk-u-padding-left-4"
                >
                  {summaryList.invitationsToGenerateHolder}
                </dd>
              </div>
            </dl>

            <button
              class="nhsuk-button"
              data-module="nhsuk-button"
              type="submit"
            >
              Generate invitations
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
