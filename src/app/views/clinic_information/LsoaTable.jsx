import React from "react";
import Pagination from "../../components/Pagination";
import config from "./config/milesOptions";

export default function LsoaTable(prop) {
  const {
    lsoaInRange,
    checkAllHandler,
    checkRecord,
    handleRangeSelection,
    pageSize,
    currentPage,
    onSubmitHandler,
    onPageSizeChange,
    onCurrentPageChange,
    lsoaCodesAppsToFill,
    lsoaTableError,
    lastSelectedRange,
    nationalUptakePercentage,
  } = prop;

  // Pagination stuff
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = Number(firstPageIndex) + Number(pageSize);
  const currentTableData = lsoaInRange.slice(firstPageIndex, lastPageIndex);

  const milesOptions = config.milesOptions;

  const lsoaArray = lsoaInRange.filter((el) => {
    if (el.checked) {
      return el;
    }
  });

  const calculateTotalToInvite = (arr) => {
    const total = arr.reduce((acc, curr) => {
      return (
        acc +
        (Number(curr?.ELIGIBLE_POPULATION?.S) -
          Number(curr?.INVITED_POPULATION?.S))
      );
    }, 0);
    return total;
  };

  const calculateAverageExpectedUptake = (arr) => {
    const total = arr.reduce((acc, curr) => {
      return acc + Number(Number(curr?.MODERATOR?.S) * nationalUptakePercentage);
    }, 0);
    return Math.round(total / arr.length);
  };

  return (
    <section>
      <div className="govuk-form-group" id="lsoaText">
        <h3>
          <label className="govuk-label govuk-label--s" htmlFor="milesFromSite">
            Select a distance from the clinic to find eligible people per lower
            layer super output area (LSOA)
          </label>
        </h3>
      </div>
      <div className="nhsuk-form-group govuk-input__wrapper">
        <select
          className="nhsuk-select--custom nhsuk-select--width-5 "
          id="milesFromSite"
          name="milesSelector"
          autoComplete="off"
          onChange={(e) => handleRangeSelection(e)}
        >
          {milesOptions.map((e, key) => {
            return (
              <option key={key} value={e.value} selected={e.value == lastSelectedRange}>
                {e.label}
              </option>
            );
          })}
        </select>
        <div className="govuk-input__suffix" aria-hidden="true">
          miles
        </div>
      </div>
      <div className="nhsuk-form-group">
        <label className="nhsuk-label" htmlFor="pageSize">
          LSOAs per page
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
      {lsoaTableError && (
        <div id="lsoa-error-message" className="nhsuk-error-message">
          You must select LSOAs with people to invite
        </div>
      )}
      <div
        id="lsoaTable"
        className={
          lsoaTableError
            ? "nhsuk-form-group--error nhsuk-u-margin-bottom-9"
            : "nhsuk-u-margin-bottom-9"
        }
      >
        <table role="table" className="nhsuk-table-responsive">
          <thead role="rowgroup" className="nhsuk-table__head">
            <tr role="row">
              <th role="columnheader" className="custom-th" scope="col">
                <div className="nhsuk-checkboxes__item custom-padding-right-20">
                  <input
                    className="nhsuk-checkboxes__input"
                    id="selectAllLsoa"
                    name="SelectAllLsoaInList"
                    type="checkbox"
                    value=""
                    onChange={(e) => checkAllHandler(e)}
                  />
                  <label
                    className="nhsuk-label nhsuk-checkboxes__label"
                    htmlFor="selectAllLsoa"
                  >
                    <span className="nhsuk-u-visually-hidden">
                      Select All LSOA below
                    </span>
                  </label>
                </div>
              </th>
              <th role="columnheader" className="custom-th" scope="col">
                LSOA name
              </th>
              <th role="columnheader" className="custom-th" scope="col">
                Distance
              </th>
              <th
                role="columnheader"
                className="custom-th custom-th__whitespace"
                scope="col"
              >
                {`Forecast
                  uptake`}
              </th>
              <th
                role="columnheader"
                className="custom-th__whitespace"
                scope="col"
              >
                {`IMD
                  decile`}
              </th>
              <th role="columnheader" className="custom-th" scope="col">
                Eligible
              </th>
              <th role="columnheader" className="custom-th" scope="col">
                Invited
              </th>
              <th
                role="columnheader"
                className="custom-th__whitespace"
                scope="col"
              >
                {`Available
                  to invite`}
              </th>
            </tr>
          </thead>
          {lsoaInRange.length === 0 ? (
            <tbody>
              <p>No LSOA data is available</p>
            </tbody>
          ) : (
            <tbody className="nhsuk-table__body nhsuk-u-font-size-16 style_tbody__YVzf_">
              {currentTableData?.map((e, key) => {
                return (
                  <tr key={key} role="row" className="nhsuk-table__row">
                    <td role="cell" className="nhsuk-table__cell">
                      <div className="nhsuk-checkboxes__item custom-padding-right-20">
                        <input
                          className="nhsuk-checkboxes__input"
                          data-testid={`select-${e.LSOA_NAME?.S.replace(
                            /\s/g,
                            "-"
                          )}`}
                          id={`select-${e.LSOA_NAME?.S.replace(/\s/g, "-")}`}
                          name="SelectALsoaInList"
                          type="checkbox"
                          onChange={(event) => checkRecord(event, e)}
                          checked={e.checked}
                        />
                        <label
                          className="nhsuk-label nhsuk-checkboxes__label"
                          htmlFor={`select-${e.LSOA_NAME?.S.replace(
                            /\s/g,
                            "-"
                          )}`}
                        >
                          <span className="nhsuk-u-visually-hidden">
                            {e.LSOA_NAME?.S.replace(/\s/g, "-")}
                          </span>
                        </label>
                      </div>
                    </td>
                    <td role="cell" className="nhsuk-table__cell">
                      <span className="nhsuk-table-responsive__heading">
                        LSOA name{" "}
                      </span>
                      {e.LSOA_NAME?.S}
                    </td>
                    <td role="cell" className="nhsuk-table__cell">
                      <span className="nhsuk-table-responsive__heading">
                        Distance{" "}
                      </span>
                      {e.DISTANCE_TO_SITE?.N}
                    </td>
                    <td role="cell" className="nhsuk-table__cell">
                      <span className="nhsuk-table-responsive__heading">
                        Forecast uptake{" "}
                      </span>
                      {(Number(e.MODERATOR?.S) * nationalUptakePercentage).toFixed(2)}%
                    </td>
                    <td role="cell" className="nhsuk-table__cell">
                      <span className="nhsuk-table-responsive__heading">
                        IMD decile{" "}
                      </span>
                      {e.IMD_DECILE?.N}
                    </td>
                    <td role="cell" className="nhsuk-table__cell">
                      <span className="nhsuk-table-responsive__heading">
                        Eligible{" "}
                      </span>
                      {e.ELIGIBLE_POPULATION?.S}
                    </td>
                    <td role="cell" className="nhsuk-table__cell">
                      <span className="nhsuk-table-responsive__heading">
                        Invited{" "}
                      </span>
                      {e.INVITED_POPULATION?.S}
                    </td>
                    <td role="cell" className="nhsuk-table__cell">
                      <span className="nhsuk-table-responsive__heading">
                        Available to invite{" "}
                      </span>
                      {Number(e.ELIGIBLE_POPULATION?.S) -
                        Number(e.INVITED_POPULATION?.S)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
        <Pagination
          currentPage={currentPage}
          totalCount={lsoaInRange.length}
          pageSize={pageSize}
          onPageChange={(page) => onCurrentPageChange(page)}
        />
      </div>
      <div className="nhsuk-grid-row">
        <div className="nhsuk-grid-column-one-half">
          <dl className="nhsuk-summary-list">
            <div className="nhsuk-summary-list__row">
              <dt className="nhsuk-summary-list__key custom-border-top-1px-solid">
                Total available to invite
              </dt>
              <dd className="nhsuk-summary-list__value custom-border-top-1px-solid">
                {calculateTotalToInvite(lsoaArray)}
              </dd>
            </div>
          </dl>
        </div>
        <div className="nhsuk-grid-column-two-thirds">
          <button
            className="nhsuk-button"
            data-module="nhsuk-button"
            type="submit"
            disabled={lsoaInRange.length === 0}
            onClick={() =>
              onSubmitHandler(
                calculateTotalToInvite(lsoaArray),
                calculateAverageExpectedUptake(lsoaArray),
                lsoaCodesAppsToFill(lsoaArray)
              )
            }
          >
            Calculate number to invite
          </button>
        </div>
      </div>
    </section>
  );
}
