import "../../styles/css/sass.css";
import React from "react";
import Pagination from "../../components/Pagination";

let PageSize = 10;

export default function ClinicSummaryTable(props) {
  const {
    onCheckHandler,
    onClickClinicHandler,
    onPageSizeChange,
    onCurrentPageChange,
  } = props;

  const currentPage = props.currentPage;
  const firstPageIndex = (currentPage - 1) * props.pageSize;
  const lastPageIndex = Number(firstPageIndex) + Number(props.pageSize);
  const currentTableData = props.clinicList
    .sort((a, b) => {
      return Number(b.DaySincePrevInvite.N) - Number(a.DaySincePrevInvite.N);
    })
    .slice(firstPageIndex, lastPageIndex);

  return (
    <section>
      <table
        className="nhsuk-table-responsive nhsuk-u-margin-bottom-6"
        aria-labelledby="clinicTableCaption"
      >
        <caption
          id="clinicTableCaption"
          className="nhsuk-table__caption nhsuk-u-margin-bottom-4"
        >
          Clinic List
          <span className="nhsuk-hint" id="last-updated-hint">
            Last Updated: {props.lastUpdated}
          </span>
          <div className="nhsuk-checkboxes__item nhsuk-u-margin-bottom-4">
            <input
              className="nhsuk-checkboxes__input"
              id="displayClinicsNoApp"
              name="DisplayClinicsWithNoAppointmentsAvailable"
              type="checkbox"
              value=""
              onChange={(e) => onCheckHandler(e)}
            />
            <label
              className="nhsuk-label nhsuk-checkboxes__label"
              htmlFor="displayClinicsNoApp"
            >
              Display clinics with no appointments available
            </label>
          </div>
          <div className="nhsuk-form-group">
            <label className="nhsuk-label" htmlFor="pageSize">
              Clinics per page
            </label>
            <select
              className="nhsuk-select"
              id="pageSize"
              name="select-1"
              autoComplete="off"
              onChange={(e) => onPageSizeChange(e)}
            >
              <option value="10" selected>
                10
              </option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>
        </caption>
        <thead role="rowgroup" className="nhsuk-table__head">
          <tr role="row">
            <th role="columnheader" className="custom-th" scope="col">
              Clinic name
            </th>
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
        <tbody className="nhsuk-table__body nhsuk-u-font-size-16 style_tbody__YVzf_">
          {currentTableData.length ? currentTableData.map((e, key) => {
            return (
              <tr key={key} role="row" className="nhsuk-table__row">
                <td
                  role="cell"
                  className="nhsuk-table__cell custom-td__whitespace"
                >
                  <span className="nhsuk-table-responsive__heading">
                    Clinic name{" "}
                  </span>
                  {e.Availability.N !== "0" ? (
                    <a
                      id={e.ClinicName.S}
                      className="nhsuk-link--no-visited-state"
                      href="#"
                      onClick={(event) => {
                        onClickClinicHandler(event, e);
                      }}
                    >
                      {e.ClinicName?.S ? e.ClinicName?.S : "Not Available"}
                    </a>
                  ) : e.ClinicName?.S ? (
                    e.ClinicName?.S
                  ) : (
                    "Not Available"
                  )}
                </td>
                <td role="cell" className="nhsuk-table__cell">
                  <span className="nhsuk-table-responsive__heading">
                    Date of previous invitations{" "}
                  </span>
                  {e.PrevInviteDate?.S.trim().length !== 0
                    ? e.PrevInviteDate?.S
                    : "Not Available"}
                </td>
                <td role="cell" className="nhsuk-table__cell">
                  <span className="nhsuk-table-responsive__heading">
                    Days since previous invitations{" "}
                  </span>
                  {e.DaySincePrevInvite?.N !== "NaN"
                    ? e.DaySincePrevInvite?.N
                    : 0}
                </td>
                <td role="cell" className="nhsuk-table__cell">
                  <span className="nhsuk-table-responsive__heading">
                    Number of invitations sent{" "}
                  </span>
                  {e.InvitesSent?.N}
                </td>
                <td role="cell" className="nhsuk-table__cell">
                  <span className="nhsuk-table-responsive__heading">
                    Number of appointments available{" "}
                  </span>
                  {e.Availability?.N}
                </td>
              </tr>
            );
          }) : <tr>
            <td colspan="5"><span><b>The ICB you selected has no clinics with appointments remaining. 
                  Select another participating ICB or display clinics with no appointments remaining.
                  </b></span></td>
          </tr>}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={props.clinicList.length}
        pageSize={props.pageSize}
        onPageChange={(page) => onCurrentPageChange(page)}
      />
    </section>
  );
}
