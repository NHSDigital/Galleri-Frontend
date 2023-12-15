export default function RecentInvitationHistory(props) {
  const { displayViewAllPrevInvitations } = props;
  const { dateOfPrevInv, daysSincePrevInv, invSent, appsRemaining } =
    props.props;
  return (
    <div className="nhsuk-grid-row">
      <div className="nhsuk-grid-column-three-quarters">
        <div className="nhsuk-table__panel-with-heading-tab">
          <h3 className="nhsuk-table__heading-tab">Recent Invitation History</h3>
          <table className="nhsuk-table">
            <thead role="rowgroup" className="nhsuk-table__head">
              <tr role="row">
                <th role="columnheader" className="" scope="col">
                  Date of previous invitations
                </th>
                <th role="columnheader" className="" scope="col">
                  Days since previous invitations
                </th>
                <th role="columnheader" className="" scope="col">
                  Invitations sent
                </th>
                <th role="columnheader" className="" scope="col">
                  Appointments remaining
                </th>
              </tr>
            </thead>
            <tbody className="nhsuk-table__body">
              <tr role="row" className="nhsuk-table__row">
                <td className="nhsuk-table__cell ">{dateOfPrevInv}</td>
                <td className="nhsuk-table__cell ">{daysSincePrevInv}</td>
                <td className="nhsuk-table__cell ">{invSent}</td>
                <td className="nhsuk-table__cell ">{appsRemaining}</td>
              </tr>
            </tbody>
          </table>
          {displayViewAllPrevInvitations && (
          <div style={{marginTop:"20px"}} className=".nhsuk-main-wrapper--l">
            <a
              id="changeCancelButtonId"
              className="unfinished-link nhsuk-link--no-visited-state"
              href=""
              style={{ textDecorationLine: "underline" }}
              onClick={(event) => {event.preventDefault();}}
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
