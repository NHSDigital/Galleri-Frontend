import "../../styles/css/sass.css";
import React from "react";
import ClinicInfo from "./ClinicInfo";
import CheckDetailsBanner from "./CheckDetailsBanner";
import ConfirmationBanner from "./ConfirmationBanner";
import Actions from "./Actions";
import SummaryListFirst from "./SummaryListFirst";
import SummaryListSecond from "./SummaryListSecond";
import { useInactivity } from "@/app/context/AutoSignOutProvider";
import LoggedOut from "../logged_out/LoggedOut";

export default function InvitationSummaryPage(props) {
  const {
    clinicName,
    address1,
    address2,
    postcode,
    displayCheckDetailsBanner,
    displayErrorInvitationSummary,
    displayConfirmationInvitationSummary,
    onClickGenerateHandler,
    onClickGoBackPrevPageLinkHandler,
    recentInvitationHistory,
    rangeSelection,
    targetAppToFill,
    targetPercentageToFill,
    totalToInvite,
    avgExpectedUptake,
    noInviteToGenerate,
  } = props;

  const { showLogoutPage } = useInactivity();

  return !showLogoutPage ? (
    <div
      data-testid="invitation-summary-container"
      className="nhsuk-width-container "
    >
      <main className="nhsuk-main-wrapper " id="invitation-summary" role="main">
        <section className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-full">
            {!displayConfirmationInvitationSummary && (
              <div className="nhsuk-back-link">
                <a
                  className="nhsuk-back-link__link"
                  href="#"
                  onClick={onClickGoBackPrevPageLinkHandler}
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
                  Go back to clinic invitations
                </a>
              </div>
            )}
            <h1 data-testid="header" id="invitation-summary-heading">
              Invitation summary
            </h1>
            {displayCheckDetailsBanner && (
              <CheckDetailsBanner
                onClickGoBackPrevPageLinkHandler={
                  onClickGoBackPrevPageLinkHandler
                }
                noInviteToGenerate={noInviteToGenerate}
                totalToInvite={totalToInvite}
                targetAppToFill={targetAppToFill}
              />
            )}
          </div>
          <article
            data-testid="main-content"
            id="main-content"
            className="nhsuk-grid-column-two-thirds"
          >
            {displayConfirmationInvitationSummary && <ConfirmationBanner />}
            <ClinicInfo
              clinicName={clinicName}
              address1={address1}
              address2={address2}
              postcode={postcode}
            />
            <SummaryListFirst
              props={recentInvitationHistory}
              rangeSelection={rangeSelection}
              targetAppToFill={targetAppToFill}
              targetPercentageToFill={targetPercentageToFill}
              totalToInvite={totalToInvite}
            />
            <SummaryListSecond
              targetAppToFill={targetAppToFill}
              avgExpectedUptake={avgExpectedUptake}
              displayErrorInvitationSummary={displayErrorInvitationSummary}
              noInviteToGenerate={noInviteToGenerate}
            />
            <Actions
              onClickGenerateHandler={onClickGenerateHandler}
              onClickGoBackPrevPageLinkHandler={
                onClickGoBackPrevPageLinkHandler
              }
              displayErrorInvitationSummary={displayErrorInvitationSummary}
              displayConfirmationInvitationSummary={
                displayConfirmationInvitationSummary
              }
            />
          </article>
        </section>
      </main>
    </div>
  ) : (
    <LoggedOut />
  );
}
