import "../../styles/css/sass.css";
import React from "react";

export default function CheckDetailsBanner(props) {
  const {
    onClickGoBackPrevPageLinkHandler,
    noInviteToGenerate,
    totalToInvite,
    targetAppToFill,
  } = props;

  return (
    <div>
      {
        //when invitations are more than total
        noInviteToGenerate < totalToInvite ? (
          <div>
            <div
              role="alert"
              aria-live="assertive"
              data-testid="check-details-banner"
              id="validation-alert"
              className="nhsuk-inset-text"
            >
              <span className="nhsuk-u-visually-hidden">
                Validation Alert:{" "}
              </span>
              <h2 className="nhsuk-heading-m">
                Check these details before you generate invitations
              </h2>
            </div>
          </div>
        ) : (
          //invitations are less than total
          <div>
            <div
              role="alert"
              aria-live="polite"
              id="information-alert"
              className="nhsuk-inset-text"
            >
              <span className="nhsuk-u-visually-hidden">Information: </span>
              <p className="nhsuk-body-m">
                To ensure you fill the target number of appointments,{" "}
                <a onClick={onClickGoBackPrevPageLinkHandler} href="#">
                  select more people to invite
                </a>
                .
              </p>
            </div>
          </div>
        )
      }
    </div>
  );
}
