import "../styles/css/sass.css";

// Navigation Menu
export default function NavMenu() {
  return (
    <nav
      class="nhsuk-navigation"
      id="header-navigation"
      role="navigation"
      aria-label="Primary navigation"
      aria-labelledby="label-navigation"
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
        </ul>
    </nav>
  );
}
