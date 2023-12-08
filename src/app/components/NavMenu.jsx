import "../styles/css/sass.css";
import { signOut } from "next-auth/react";

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
          <a class="nhsuk-header__navigation-link" href="/">
            Clinic Summary
          </a>
        </li>
        <li class="nhsuk-header__navigation-item">
          <a class="nhsuk-header__navigation-link" href="#">
            Invitation Variables
          </a>
        </li>
        <li class="nhsuk-header__navigation-item" style={{ marginLeft: "auto" }}>
          <a class="nhsuk-header__navigation-link" style={{cursor: 'pointer'}} onClick={signOut}>
            Sign Out
          </a>
        </li>
      </ul>
    </nav>
  );
}
