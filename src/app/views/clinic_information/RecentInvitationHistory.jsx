export default function RecentInvitationHistory(props) {
  const { displayViewAllPrevInvitations } = props;
  const { dateOfPrevInv, daysSincePrevInv, invSent, appsRemaining } =
    props.props;
  return (
    <div className="nhsuk-grid-row">
      <div className="nhsuk-grid-column-three-quarters">
        <div className="nhsuk-table__panel-with-heading-tab">
          <h3 className="nhsuk-table__heading-tab">
            Recent Invitation History
          </h3>
          <table className="nhsuk-table-responsive nhsuk-u-margin-bottom-4">
            <thead role="rowgroup" className="nhsuk-table__head">
              <tr role="row">
                <th
                  role="columnheader"
                  className="custom-th custom-th__whitespace"
                  scope="col"
                >
                  Date of previous invitations
                </th>
                <th
                  role="columnheader"
                  className="custom-th custom-th__whitespace"
                  scope="col"
                >
                  Days since previous invitations
                </th>
                <th role="columnheader" className="custom-th" scope="col">
                  Invitations sent
                </th>
                <th
                  role="columnheader"
                  className="custom-th custom-th__whitespace"
                  scope="col"
                >
                  Appointments remaining
                </th>
              </tr>
            </thead>
            <tbody className="nhsuk-table__body">
              <tr role="row" className="nhsuk-table__row">
                <td className="nhsuk-table__cell ">
                  <span className="nhsuk-table-responsive__heading">
                    Date of previous invitations{" "}
                  </span>
                  {dateOfPrevInv}
                </td>
                <td className="nhsuk-table__cell ">
                  <span className="nhsuk-table-responsive__heading">
                    Days since previous invitations{" "}
                  </span>
                  {daysSincePrevInv}
                </td>
                <td className="nhsuk-table__cell ">
                  <span className="nhsuk-table-responsive__heading">
                    Invitations sent{" "}
                  </span>
                  {invSent}
                </td>
                <td className="nhsuk-table__cell ">
                  <span className="nhsuk-table-responsive__heading">
                    Appointments remaining{" "}
                  </span>
                  {appsRemaining}
                </td>
              </tr>
            </tbody>
          </table>
          {displayViewAllPrevInvitations && (
            <div className=".nhsuk-main-wrapper--l">
              <a
                id="viewAllPrevInvitationsButton"
                className="unfinished-link nhsuk-link--no-visited-state"
                href=""
                onClick={(event) => {
                  event.preventDefault();
                }}
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
