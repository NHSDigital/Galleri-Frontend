import React from "react";
import "../../styles/css/sass.css";

export default function StartPage(props) {
  const {
    onClickStartHandler
  } = props;
  return (
    <>
      <header class="nhsuk-header nhsuk-header--transactional" role="banner">
        <div class="nhsuk-width-container nhsuk-header__container">
          <div class="nhsuk-header__logo nhsuk-header__logo--only"><a class="nhsuk-header__link" href="/" aria-label="NHS homepage">
            <svg class="nhsuk-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 16" height="40" width="100">
              <path class="nhsuk-logo__background" fill="#005eb8" d="M0 0h40v16H0z"></path>
              <path class="nhsuk-logo__text" fill="#fff" d="M3.9 1.5h4.4l2.6 9h.1l1.8-9h3.3l-2.8 13H9l-2.7-9h-.1l-1.8 9H1.1M17.3 1.5h3.6l-1 4.9h4L25 1.5h3.5l-2.7 13h-3.5l1.1-5.6h-4.1l-1.2 5.6h-3.4M37.7 4.4c-.7-.3-1.6-.6-2.9-.6-1.4 0-2.5.2-2.5 1.3 0 1.8 5.1 1.2 5.1 5.1 0 3.6-3.3 4.5-6.4 4.5-1.3 0-2.9-.3-4-.7l.8-2.7c.7.4 2.1.7 3.2.7s2.8-.2 2.8-1.5c0-2.1-5.1-1.3-5.1-5 0-3.4 2.9-4.4 5.8-4.4 1.6 0 3.1.2 4 .6"></path>
            </svg>
          </a>
          </div>
          <div class="nhsuk-header__transactional-service-name">
            <a class="nhsuk-header__transactional-service-name--link" href="#">Galleri</a>
            <a class="nhsuk-skip-link" href="#maincontent">Skip to main content</a>
          </div>
        </div>
      </header>
      <div class="nhsuk-width-container">
        <main class="nhsuk-main-wrapper" id="maincontent" role="main">
          <div class="nhsuk-grid-row">
            <div class="nhsuk-grid-column-two-thirds">
              <h1>Galleri Pilot System</h1>
              <p>Use this service to send out invitations to the Galleri Pilot Systems</p>
              <p>Participants are eligible to be invited if they meet the following criteria:</p>
              <ul>
                <li>live in England</li>
                <li>registered to a participating GP Practice</li>
                <li>aged between 50 and 77</li>
                <li>have not had a cancer diagnosis in the past 3 years</li>
              </ul>

              <h2>To get started, click button below</h2>

              <a class="nhsuk-button" href="#" role="button" draggable="false" onClick={onClickStartHandler}>
                Start now
              </a>

              <p>
                By using this service you are agreeing to our{" "}
                <a href="#">terms of use</a> and <a href="#">privacy policy</a>.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
