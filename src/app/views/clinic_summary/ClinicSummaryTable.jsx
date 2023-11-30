import React from "react";
import Pagination from "../../components/Pagination";

export default function ClinicSummaryTable(props) {
  const {
    onCheckHandler,
    onClickClinicHandler,
    onPageSizeChange,
    onCurrentPageChange, } = props;

  const currentPage = props.currentPage;
  const firstPageIndex = (currentPage - 1) * props.pageSize;
  const lastPageIndex = Number(firstPageIndex) + Number(props.pageSize);
  const currentTableData =  props.clinicList.sort((a, b) => {
    return (
      Number(b.DaySincePrevInvite.N) - Number(a.DaySincePrevInvite.N)
    );
  }).slice(firstPageIndex, lastPageIndex);

  return (
    <div>
      <table role="table" class="nhsuk-table-responsive">
        <caption class="nhsuk-table__caption">
          Clinic List
          <div class="nhsuk-hint" id="last-updated-hint">
            Last Updated: {props.lastUpdated}
          </div>
          <div class="nhsuk-checkboxes__item">
            <input
              class="nhsuk-checkboxes__input"
              id="displayClinicsNoApp"
              name="DisplayClinicsWithNoAppointmentsAvailable"
              type="checkbox"
              value=""
              onChange={(e) => onCheckHandler(e)}
            />
            <label
              class="nhsuk-label nhsuk-checkboxes__label"
              for="displayClinicsNoApp"
            >
              Display clinics with no appointments available
            </label>
          </div>
          <br />
          <div class="nhsuk-form-group">
            <label class="nhsuk-label" for="pageSize">
              Clinics per page
            </label>
            <select class="nhsuk-select" id="pageSize" name="select-1" onChange={(e) => onPageSizeChange(e)}>
              <option value="10" selected>10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </select>
          </div>
        </caption>
        <thead role="rowgroup" class="nhsuk-table__head">
          <tr role="row">
            <th role="columnheader" class="" scope="col">
              Clinic name
            </th>
            <th role="columnheader" class="" scope="col">
              Date of previous
              <br />
              invitations
            </th>
            <th role="columnheader" class="" scope="col">
              Days since previous
              <br />
              invitations generated
            </th>
            <th role="columnheader" class="" scope="col">
              Number of invitations
              <br />
              sent
            </th>
            <th role="columnheader" class="" scope="col">
              Number of appointments
              <br />
              available
            </th>
          </tr>
        </thead>
        <tbody class="nhsuk-table__body nhsuk-u-font-size-16 style_tbody__YVzf_">
          {currentTableData?.map((e, key) => {
            return (
                <tr role="row" class="nhsuk-table__row">
                  <td role="cell" class="nhsuk-table__cell">
                    {e.Availability.N !== "0" ? (
                      <a
                        id={e.ClinicName.S}
                        class="nhsuk-back-link"
                        onClick={(event) => onClickClinicHandler(event, e)}
                      >
                        {e.ClinicName?.S ? e.ClinicName?.S : "Not Available"}
                      </a>
                    ) : e.ClinicName?.S ? (
                      e.ClinicName?.S
                    ) : (
                      "Not Available"
                    )}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {(e.PrevInviteDate?.S.trim().length!==0) ? e.PrevInviteDate?.S : "Not Available"}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {e.DaySincePrevInvite?.N !== "NaN"
                      ? e.DaySincePrevInvite?.N
                      : 0}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {e.InvitesSent?.N}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {e.Availability?.N}
                  </td>
                </tr>
              );
          })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalCount={props.clinicList.length}
        pageSize={props.pageSize}
        onPageChange={page => onCurrentPageChange(page)}
      />
    </div>
  );
}
