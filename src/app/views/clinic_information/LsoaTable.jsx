import React from "react";

export default function LsoaTable(prop) {
  const { lsoaInRange, checkAllHandler, checkRecord, handleRangeSelection, handleTotalToInvite } = prop;

  const mileSelectionOptions = [[...Array(21).keys()], 25, 30, 35, 40, 45, 50, 100].flat()

  mileSelectionOptions.shift()

  const lsoaArray = lsoaInRange.filter(el => {
    if (el.checked){
      return el
    }
  })

  const calculateTotalToInvite = (arr) => {
    const total = arr.reduce((acc,curr) => {
      return acc + (Number(curr?.ELIGIBLE_POPULATION?.S) - Number(curr?.INVITED_POPULATION?.S))
      },0)
    // handleTotalToInvite(total)
  return total
  }

  const calculateAverageExpectedUptake = (arr) => {
    const total = arr.reduce((acc,curr) => {
      return acc + Number(curr?.FORECAST_UPTAKE?.N)
      },0)
  return Math.round(total / arr.length)
  }

  console.log("avg uptake = ", calculateAverageExpectedUptake(lsoaArray))

  return (
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
            return(<option value="">+{e}</option>)
          })}
        </select>
        <div
          class={ "govuk-input__suffix" }
          aria-hidden="true"
        >
          miles
        </div>
      </div>
      <div id="lsoaTable">
        <table role="table" class="nhsuk-table-responsive">
          <thead role="rowgroup" class="nhsuk-table__head">
            <tr role="row">
              <th role="columnheader" class="" scope="col" style={{"vertical-align": "bottom"}}>
                <div class="nhsuk-checkboxes__item">
                  <input
                    class="nhsuk-checkboxes__input"
                    id="selectAllLsoa"
                    name="SelectAllLsoaInList"
                    type="checkbox"
                    value=""
                    onChange={(e) => checkAllHandler(e)}
                  />
                  <label
                    class="nhsuk-label nhsuk-checkboxes__label"
                    for="selectAllLsoa"
                  >
                  </label>
                </div>
              </th>
              <th role="columnheader" class="" scope="col" style={{"vertical-align": "bottom"}}>
                LSOA name
              </th>
              <th role="columnheader" class="" scope="col" style={{"vertical-align": "bottom"}}>
                Distance
              </th>
              <th role="columnheader" class="" scope="col">
                Forecast
                <br/>
                uptake
              </th>
              <th role="columnheader" class="" scope="col">
                IMD
                <br/>
                decile
              </th>
              <th role="columnheader" class="" scope="col" style={{"vertical-align": "bottom"}}>
                Eligible
              </th>
              <th role="columnheader" class="" scope="col" style={{"vertical-align": "bottom"}}>
                Invited
              </th>
              <th role="columnheader" class="" scope="col">
                Available
                <br/>
                to invite
              </th>
            </tr>
          </thead>
          <tbody class="nhsuk-table__body nhsuk-u-font-size-16 style_tbody__YVzf_">
            {lsoaInRange?.map((e, key) => {
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
                    {e.FORECAST_UPTAKE?.N}
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
        </table>
      </div>
      <br/>
      <div class="nhsuk-grid-column-two-thirds">
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
  );
}

