import React from "react";
import axios from "axios";

export default function LsoaTable(prop) {
  const { lsoaInRange, checkAll, checkAllHandler, handleRangeSelection, onClickLsoaCodesAppsToFillHandler, isCheckedLsoaHandler } = prop;

    // POST lsoa codes and appsToFill (send to lambda)
  function click(e) {
      let fullUrl =
      "https://vnfuxrr9ke.execute-api.eu-west-2.amazonaws.com/dev/calculate-num-to-invite";
    let headers = {
      accept: "application/vnd.mesh.v2+json",
      "Content-Type": "application/json",
    };
    let fileContent = {
      targetAppsToFill: "131",
      lsoaCodes: {
        E01000005: {
          IMD_DECILE: "3",
          FORECAST_UPTAKE: "1",
        },
        E01004294: {
          IMD_DECILE: "5",
          FORECAST_UPTAKE: "1",
        },
        E01032767: {
          IMD_DECILE: "7",
          FORECAST_UPTAKE: "1",
        },
        E01032739: {
          IMD_DECILE: "7",
          FORECAST_UPTAKE: "1",
        },
        E01004293: {
          IMD_DECILE: "8",
          FORECAST_UPTAKE: "1",
        },
      },
    };
    // let headers = await generateHeaders(
    //   mailboxID,
    //   mailboxPassword,
    //   mailboxTarget
    // );
    let config = { headers: headers };
    // if (tlsEnabled) {
    //   config.httpsAgent = agent;
    // }
    let response = axios.post(fullUrl, fileContent).then((response) => {
      console.log(response.data)
    });

    console.log(response.data)
    }// will need to add some conditionals on when this fires

  const mileSelectionOptions = [[...Array(21).keys()], 25, 30, 35, 40, 45, 50, 100].flat()

  mileSelectionOptions.shift()

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
            return (<option value="">+{e}</option>)
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
                    onClick={(e) => isCheckedLsoaHandler(e, lsoaInRange)}
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
          <tbody class="nhsuk-table__body nhsuk-u-font-size-16 style_tbody__YVzf_">
            {lsoaInRange?.map((e, key) => {
              return (
                <tr role="row" class="nhsuk-table__row">
                  <td role="cell" class="nhsuk-table__cell">
                    {checkAll ? (
                      <div class="nhsuk-checkboxes__item">
                        <input
                          class="nhsuk-checkboxes__input"
                          id="selectALsoa"
                          name="SelectALsoaInList"
                          type="checkbox"
                          checked="true"
                          value=""
                        />
                        <label
                          class="nhsuk-label nhsuk-checkboxes__label"
                          for="selectALsoa"
                        >
                        </label>
                      </div>
                    ) : (
                      <div class="nhsuk-checkboxes__item">
                        <input
                          class="nhsuk-checkboxes__input"
                          id="selectALsoa"
                          name="SelectALsoaInList"
                          type="checkbox"
                          value=""
                        />
                        <label
                          class="nhsuk-label nhsuk-checkboxes__label"
                          for="selectALsoa"
                        >
                        </label>
                      </div>
                    )
                    }
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
      <br />
      <div class="nhsuk-grid-column-two-thirds">
        <dl class="nhsuk-summary-list">
          <div class="nhsuk-summary-list__row">
            <dt class="nhsuk-summary-list__key">
              Total available to invite
            </dt>
            <dd class="nhsuk-summary-list__value">{lsoaInRange.reduce((acc, curr) => acc + (Number(curr.ELIGIBLE_POPULATION?.S) - Number(curr.INVITED_POPULATION?.S)), 0)}</dd>
          </div>
        </dl>
        <button class="nhsuk-button" onClick={((e) => {
          onClickLsoaCodesAppsToFillHandler(e)
        })} >Calculate number to invite</button>
      </div>
    </div>
  );
}


