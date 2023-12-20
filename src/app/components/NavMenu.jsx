import Link from "next/link";
import "../styles/css/sass.css";
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
            <Link class="nhsuk-header__navigation-link" href="/">
              Clinic Summary
            </Link>
          </li>
          <li class="nhsuk-header__navigation-item">
            <Link class="nhsuk-header__navigation-link" href="/views/invitation_planning">
              Invitation Variables
            </Link>
          </li>
        </ul>
    </nav>
  );
}