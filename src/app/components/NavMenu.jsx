import "../styles/css/sass.css";
import { Link, Route, Routes } from "react-router-dom";
import ClinicSummary from "../views/clinic_summary/ClinicSummary";
import InvitationPlanning from "../views/invitation_planning/InvitationPlanning";
// Navigation Menu
export default function NavMenu() {
  return (
    <nav
      class="nhsuk-navigation"
      id="header-navigation"
      role="navigation"
      aria-label="Primary navigation"
    >
        <ul class="nhsuk-header__navigation-list">
          <li class="nhsuk-header__navigation-item">
            {/* <a class="nhsuk-header__navigation-link" href="/"> 
            </a> */}
            <Link to={"/clinicSummary"} class="nhsuk-header__navigation-link">Clinic Summary</Link>
          </li>
          <li class="nhsuk-header__navigation-item">
            {/* <a class="nhsuk-header__navigation-link" href="#">
              </a> */}
              <Link to={"/invitationPlanning"} class="nhsuk-header__navigation-link">Invitation Variables</Link>
            
          </li>
        </ul>
    </nav>
  );
}
