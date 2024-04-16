import "../../styles/css/sass.css";
import React from "react";

const Actions = ({
  onClickGenerateHandler,
  displayConfirmationInvitationSummary,
  onClickGoBackPrevPageLinkHandler,
}) => (
  <>
    {displayConfirmationInvitationSummary && (
      <div className="custom-pointer nhsuk-u-margin-bottom-8">
        <a
          id="returnToClinicInvitations-link"
          href="#"
          onClick={onClickGoBackPrevPageLinkHandler}
        >
          Return to clinic invitations
        </a>
      </div>
    )}
    {!displayConfirmationInvitationSummary && (
      <button
        data-testid="generate-button"
        id="generate-button"
        className="nhsuk-button"
        data-module="nhsuk-button"
        type="submit"
        onClick={onClickGenerateHandler}
      >
        Generate invitations
      </button>
    )}
    {displayConfirmationInvitationSummary && <ConfirmationContent />}
  </>
);

const ConfirmationContent = () => {
  return (
    <>
      <h2 className="govuk-heading-m">What happens next</h2>
      <ul>
        <li>
          The invitations will be sent out to the participants using NHS
          Notify
        </li>
        <li>
          The participants will be able to book their appointment at any clinic
          that has availability
        </li>
      </ul>
    </>
  );
};

export default Actions;
