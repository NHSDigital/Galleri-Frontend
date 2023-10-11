export default function InvitationCriteria(props) {
  const {} = props;
  return (
    <div class="nhsuk-grid-column-two-thirds">
      <h2 label="header">Clinic Invitation Criteria</h2>
      <br />

      <div class="govuk-form-group">
        <h3>
          <label class="govuk-label govuk-label--s" for="weight">
            Set the target percentage of appointments to fill
          </label>
        </h3>
        <div class="govuk-input__wrapper">
          <input
            class="govuk-input govuk-input--width-5"
            id="weight"
            name="weight"
            type="text"
            spellcheck="false"
          />
          <div class="govuk-input__suffix" aria-hidden="true">
            %
          </div>
        </div>
      </div>

      <button
        class="nhsuk-button nhsuk-button--secondary"
        data-module="nhsuk-button"
        type="submit"
        onClick={() => onAmendForecastHandler(nationalUptakePercentage)}
      >
        Update
      </button>

      {/* <table role="table" class="nhsuk-table-responsive">
        <tbody role="rowgroup" class="nhsuk-table__head">
          <tr role="row">
            <th role="columnheader" class="" scope="col">
              Target number of
              <br />
              appointments to
              <br />
              fill
            </th>
            <td>0</td>
          </tr>
        </tbody>
      </table> */}

      <dl class="nhsuk-summary-list">
        <div class="nhsuk-summary-list__row">
          <dt class="nhsuk-summary-list__key">
          Target number of appointments to fill
          </dt>
          <dd class="nhsuk-summary-list__value">
            0
          </dd>
        </div>
      </dl>


    </div>
  );
}
