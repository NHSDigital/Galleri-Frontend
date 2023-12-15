import "../styles/css/sass.css";

// Navigation Menu
export default function NavMenu() {
  return (
    <nav
      className="nhsuk-navigation"
      id="header-navigation"
      role="navigation"
      aria-label="Primary navigation"
    >
        <ul className="nhsuk-header__navigation-list">
          <li className="nhsuk-header__navigation-item">
            <a className="nhsuk-header__navigation-link" href="/">
              Clinic Summary
            </a>
          </li>
          <li className="nhsuk-header__navigation-item">
            <a className="nhsuk-header__navigation-link" href="#">
              Invitation Variables
            </a>
          </li>
        </ul>
    </nav>
  );
}
