export default function RecentInvitationHistory(props) {
  const { displayViewAllPrevInvitations } = props;
  const { dateOfPrevInv, daysSincePrevInv, invSent, appsRemaining } =
    props.props;
  return (
    <div class="nhsuk-grid-row">
      <div class="nhsuk-grid-column-three-quarters">
        <div class="nhsuk-table__panel-with-heading-tab">
          <h3 class="nhsuk-table__heading-tab">Recent Invitation History</h3>
          <table class="nhsuk-table-responsive">
            <thead role="rowgroup" class="nhsuk-table__head">
              <tr role="row">
                <th role="columnheader" class="custom-th custom-th__whitespace" scope="col">
                  Date of previous invitations
                </th>
                <th role="columnheader" class="custom-th custom-th__whitespace" scope="col">
                  Days since previous invitations
                </th>
                <th role="columnheader" class="custom-th" scope="col">
                  Invitations sent
                </th>
                <th role="columnheader" class="custom-th custom-th__whitespace" scope="col">
                  Appointments remaining
                </th>
              </tr>
            </thead>
            <tbody class="nhsuk-table__body">
              <tr role="row" class="nhsuk-table__row">
                <td class="nhsuk-table__cell "><span className="nhsuk-table-responsive__heading">
                  Date of previous invitations{" "}
                </span>{dateOfPrevInv}</td>
                <td class="nhsuk-table__cell "><span className="nhsuk-table-responsive__heading">
                  Days since previous invitations{" "}
                </span>{daysSincePrevInv}</td>
                <td class="nhsuk-table__cell "><span className="nhsuk-table-responsive__heading">
                  Invitations sent{" "}
                </span>{invSent}</td>
                <td class="nhsuk-table__cell "><span className="nhsuk-table-responsive__heading">
                  Appointments remaining{" "}
                </span>{appsRemaining}</td>
              </tr>
            </tbody>
          </table>
          {displayViewAllPrevInvitations && (
            <div style={{ marginTop: "20px" }} className=".nhsuk-main-wrapper--l">
              <a
                id="changeCancelButtonId"
                className="unfinished-link nhsuk-link--no-visited-state"
                href=""
                style={{ textDecorationLine: "underline" }}
                onClick={(event) => { event.preventDefault(); }}
              >
                View all previous invitations
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
