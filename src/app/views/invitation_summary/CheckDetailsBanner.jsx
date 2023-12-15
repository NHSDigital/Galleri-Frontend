import "../../styles/css/sass.css";
import React from "react";

export default function CheckDetailsBanner(props) {
  const {
    onClickGoBackPrevPageLinkHandler,
    noInviteToGenerate,
    totalToInvite,
  } = props;

  return (
    <div>
      {
        //when invitations are more than total
        noInviteToGenerate < totalToInvite ? (
          <div>
            <div data-testid="check-details-banner" id="check-details-banner" className="nhsuk-inset-text">
              <span className="nhsuk-u-visually-hidden">Validation Alert: </span>
              <h3>Check these details before you generate invitations</h3>
            </div>
          </div>
        )
          //invitations are less than total
          :
          (<div>
            <div class="nhsuk-inset-text">
              <span class="nhsuk-u-visually-hidden">Information: </span>
              <h3>To ensure you fill the target number of appointments, <a onClick={onClickGoBackPrevPageLinkHandler} href="#lsoaTable">select more people to invite</a>.</h3>
            </div>
          </div>)}
    </div>)
}

