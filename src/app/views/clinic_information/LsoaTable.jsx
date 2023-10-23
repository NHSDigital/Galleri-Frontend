import React from "react";

export default function LsoaTable(prop) {
  const lsoaList = [
    {
      "LsoaName": { "S": "LSOA A"},
      "Distance": { "N": "10"},
      "ForecastUptake": { "N": "16 %"},
      "ImdDecile": { "N": "1"},
      "Eligible": { "N": "500"},
      "Invited": { "N": "50"},
      "AvailableToInvite": { "N": "450"}
    },
    {
      "LsoaName": { "S": "LSOA B"},
      "Distance": { "N": "15"},
      "ForecastUptake": { "N": "14 %"},
      "ImdDecile": { "N": "2"},
      "Eligible": { "N": "250"},
      "Invited": { "N": "100"},
      "AvailableToInvite": { "N": "150"}
    }
  ]
  const {  } = prop;
  const props = { lsoaList }
  
  return (
    <div /*class="nhsuk-grid-column-two-thirds"*/>
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
            // "govuk-input govuk-input--width-5"
            "nhsuk-select"
            // isInputTargetPercentageExceed && isInputTargetPercentageTotal
              // ? "govuk-input govuk-input--width-5"
              // : "govuk-input govuk-input--width-5 govuk-input--error"
          }
          id="milesFromSite"
          name="miles"
          onChange={(e) => handleInputChange(e)}
        >
          <option value="first">+1</option>
        </select>
        <div
          class={ "govuk-input__suffix"
            // isInputTargetPercentageExceed && isInputTargetPercentageTotal
              // ? "govuk-input__suffix"
              // : "govuk-input__suffix govuk-input__suffix--error"
          }
          aria-hidden="true"
        >
          miles
        </div>
      </div>
      <div id="lsoaTable">
        <table role="table" class="nhsuk-table-responsive">
          <thead role="rowgroup" class="nhsuk-table__head">
            <tr role="row">
              <th role="columnheader" class="" scope="col">
                <div class="nhsuk-checkboxes__item">
                  <input
                    class="nhsuk-checkboxes__input"
                    id="selectAllLsoa"
                    name="SelectAllLsoaInList"
                    type="checkbox"
                    value=""
                    // onChange={(e) => onCheckHandler(e)}
                  />
                </div>
              </th>
              <th role="columnheader" class="" scope="col">
                LSOA name
              </th>
              <th role="columnheader" class="" scope="col">
                Distance
              </th>
              <th role="columnheader" class="" scope="col">
                Forecast uptake
              </th>
              <th role="columnheader" class="" scope="col">
                IMD decile
              </th>
              <th role="columnheader" class="" scope="col">
                Eligible
              </th>
              <th role="columnheader" class="" scope="col">
                Invited
              </th>
              <th role="columnheader" class="" scope="col">
                Available to invite
              </th>
            </tr>
          </thead>
          <tbody class="nhsuk-table__body nhsuk-u-font-size-16 style_tbody__YVzf_">
            {props.lsoaList?.map((e, key) => {
              return (
                <tr role="row" class="nhsuk-table__row">
                  <td role="cell" class="nhsuk-table__cell">
                    <div class="nhsuk-checkboxes__item">
                      <input
                        class="nhsuk-checkboxes__input"
                        id="selectAnLsoa"
                        name="SelectAnLsoaInList"
                        type="checkbox"
                        value=""
                        // onChange={(e) => onCheckHandler(e)}
                      />
                    </div>
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {e.LsoaName?.S}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {e.Distance?.N}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {e.ForecastUptake?.N}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {e.ImdDecile?.N}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {e.Eligible?.N}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {e.Invited?.N}
                  </td>
                  <td role="cell" class="nhsuk-table__cell">
                    {e.AvailableToInvite?.N}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


