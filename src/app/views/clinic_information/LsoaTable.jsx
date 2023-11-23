import React, { useState } from "react";
import Pagination from "@/app/components/pagination";
import { AppStateContext } from '@/app/context/AppStateContext';

let PageSize = 10;

export default function LsoaTable(prop) {
  const { lsoaInRange, checkAllHandler, checkRecord, handleRangeSelection, lsoaCodesAppsToFill, isCheckedLsoaHandler, handleTotalToInvite, onSubmitHandler } = prop;
  // Pagination stuff
  const [currentPage, setCurrentPage] = useState(1);
  const firstPageIndex = (currentPage - 1) * PageSize;
  const lastPageIndex = firstPageIndex + PageSize;
  const mileSelectionOptions = [[...Array(21).keys()], 25, 30, 35, 40, 45, 50, 100].flat()

  mileSelectionOptions.shift()
  const lsoaArray = lsoaInRange.filter(el => {
    if (el.checked) {
      return el
    }
  })

  const calculateTotalToInvite = (arr) => {
    const total = arr.reduce((acc, curr) => {
      return acc + (Number(curr?.ELIGIBLE_POPULATION?.S) - Number(curr?.INVITED_POPULATION?.S))
    }, 0)
    // handleTotalToInvite(total)
    return total
  }

  const calculateAverageExpectedUptake = (arr) => {
    const total = arr.reduce((acc, curr) => {
      return acc + Number(curr?.FORECAST_UPTAKE?.N)
    }, 0)
    return Math.round(total / arr.length)
  }

  const currentTableData = lsoaInRange.slice(firstPageIndex, lastPageIndex);
  console.log("avg uptake = ", calculateAverageExpectedUptake(lsoaArray))

  return (
    <div>
      <div>
        <div class="govuk-form-group" id="lsoaText">
          <h3>
            <label class="govuk-label govuk-label--s" for="selectDistanceText">
              Select a distance from the clinic to find eligible people per lower layer super output area (LSOA)
            </label>
          </h3>
        </div>
        <div class="govuk-input__wrapper" id="distance">
          <select
            class={
              "nhsuk-select"
            }
            id="milesFromSite"
            name="miles"
            onChange={(e) => handleRangeSelection(e)}
          >
            {mileSelectionOptions.map((e, key) => {
              return (<option id={e} value="">+{e}</option>)
            })}
          </select>
          <div
            class={"govuk-input__suffix"}
            aria-hidden="true"
          >
            miles
          </div>
        </div>
        <div id="lsoaTable">
          <table role="table" class="nhsuk-table-responsive">
            <thead role="rowgroup" class="nhsuk-table__head">
              <tr role="row">
                <th role="columnheader" class="" scope="col" style={{ "vertical-align": "bottom" }}>
                  <div class="nhsuk-checkboxes__item">
                    <input
                      class="nhsuk-checkboxes__input"
                      id="selectAllLsoa"
                      name="SelectAllLsoaInList"
                      type="checkbox"
                      value=""
                      onChange={(e) => checkAllHandler(e)}
                    // onClick={(e) => isCheckedLsoaHandler(e, lsoaInRange)}
                    />
                    <label
                      class="nhsuk-label nhsuk-checkboxes__label"
                      for="selectAllLsoa"
                    >
                    </label>
                  </div>
                </th>
                <th role="columnheader" class="" scope="col" style={{ "vertical-align": "bottom" }}>
                  LSOA name
                </th>
                <th role="columnheader" class="" scope="col" style={{ "vertical-align": "bottom" }}>
                  Distance
                </th>
                <th role="columnheader" class="" scope="col">
                  Forecast
                  <br />
                  uptake
                </th>
                <th role="columnheader" class="" scope="col">
                  IMD
                  <br />
                  decile
                </th>
                <th role="columnheader" class="" scope="col" style={{ "vertical-align": "bottom" }}>
                  Eligible
                </th>
                <th role="columnheader" class="" scope="col" style={{ "vertical-align": "bottom" }}>
                  Invited
                </th>
                <th role="columnheader" class="" scope="col">
                  Available
                  <br />
                  to invite
                </th>
              </tr>
            </thead>
            {
              lsoaInRange.length === 0 ? (
                <tbody>
                  <div>No LSOA data is available</div>
                </tbody>
              ) : (
                <tbody class="nhsuk-table__body nhsuk-u-font-size-16 style_tbody__YVzf_">
                  {currentTableData?.map((e, key) => {
                    return (
                      <tr role="row" class="nhsuk-table__row">
                        <td role="cell" class="nhsuk-table__cell">
                          <div class="nhsuk-checkboxes__item">
                            <input
                              class="nhsuk-checkboxes__input"
                              id="selectALsoa"
                              name="SelectALsoaInList"
                              type="checkbox"
                              onChange={(event) => checkRecord(event, e)}
                              checked={e.checked}
                            />
                            <label
                              class="nhsuk-label nhsuk-checkboxes__label"
                              for="selectALsoa"
                            >
                            </label>
                          </div>
                        </td>
                        <td role="cell" class="nhsuk-table__cell">
                          {e.LSOA_2011?.S}
                        </td>
                        <td role="cell" class="nhsuk-table__cell">
                          {e.DISTANCE_TO_SITE?.N}
                        </td>
                        <td role="cell" class="nhsuk-table__cell">
                          {e.FORECAST_UPTAKE?.N}%
                        </td>
                        <td role="cell" class="nhsuk-table__cell">
                          {e.IMD_DECILE?.N}
                        </td>
                        <td role="cell" class="nhsuk-table__cell">
                          {e.ELIGIBLE_POPULATION?.S}
                        </td>
                        <td role="cell" class="nhsuk-table__cell">
                          {e.INVITED_POPULATION?.S}
                        </td>
                        <td role="cell" class="nhsuk-table__cell">
                          {Number(e.ELIGIBLE_POPULATION?.S) - Number(e.INVITED_POPULATION?.S)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )
            }
          </table>
          <Pagination
            currentPage={currentPage}
            totalCount={lsoaInRange.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
        <br />
        <div class="nhsuk-grid-column-one-half" style={{ "padding-left": "0px" }}>
          <dl class="nhsuk-summary-list">
            <div class="nhsuk-summary-list__row">
              <dt class="nhsuk-summary-list__key">
                Total available to invite
              </dt>
              <dd class="nhsuk-summary-list__value">
                {
                  calculateTotalToInvite(lsoaArray)
                }
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="nhsuk-grid-column-two-thirds" style={{ "padding-left": "0px" }}>
        <dl class="nhsuk-summary-list">
          <div class="nhsuk-summary-list__row">
            {lsoaInRange.length === 0 ? (
              <button
                class="nhsuk-button"
                data-module="nhsuk-button"
                disabled="disabled"
              >Calculate number to invite</button>
            ) : (
              <button
                class="nhsuk-button"
                data-module="nhsuk-button"
                type="submit"
                onClick={() => onSubmitHandler(calculateTotalToInvite(lsoaArray), calculateAverageExpectedUptake(lsoaArray), lsoaCodesAppsToFill(lsoaArray))}
              // lsoaCodesAppsToFill(e)
              >
                Calculate number to invite
              </button>)}
          </div>
        </dl>
      </div>
    </div>
  );
}

LsoaTable.contextType = AppStateContext;
