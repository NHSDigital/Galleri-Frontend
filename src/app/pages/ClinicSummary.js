import '../styles/css/sass.css'
import { useState } from "react";

// Clinic Summary container
export default function ClinicSummary() {

  const [displayClinicsNoApp, setDisplayClinicsNoApp] = useState(false);
  const [clinicList, setClinicList] = useState([]);

  // Mock icb list
  setClinicList([
    // can be disabled, selected
    'NHS.UK frontend option 1',
    'NHS.UK frontend option 2',
    'NHS.UK frontend option 3',
    'NHS.UK frontend option 4',
  ])

  return (
    <div class="nhsuk-width-container ">
      <main class="nhsuk-main-wrapper " id="clinicSummary" role="main">
        <div class="nhsuk-grid-row">
          <div class="nhsuk-grid-column-two-thirds">
            <h1>Clinic Summary</h1>
            <h5>
              Summarises how many appointments are available over the next 6 weeks, how many invitations have been sent and when these were most recently sent.
            </h5>
            <div class="nhsuk-form-group">
              <label class="nhsuk-label" for="select-1">
                Select the participating integrated care board (ICB)
              </label>
              <select class="nhsuk-select" id="select-1" name="select-1">
                {
                  clinicList.map((icb, key) => {
                    return <option value={key}>{icb}</option>
                  })
                }
              </select>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
