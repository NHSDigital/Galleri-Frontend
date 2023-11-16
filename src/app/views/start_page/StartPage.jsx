import React from "react";
import "../../styles/css/sass.css";

export default function StartPage(props) {
  const {
    onClickStartHandler
  } = props;
  return (
    <>
      <nav class="nhsuk-breadcrumb" aria-label="Breadcrumb">
        <div class="nhsuk-width-container">
          <ol class="nhsuk-breadcrumb__list">
            <li class="nhsuk-breadcrumb__item">
              <a class="nhsuk-breadcrumb__link" href="#">
                Home
              </a>
            </li>
          </ol>
          <p class="nhsuk-breadcrumb__back">
            <a class="nhsuk-breadcrumb__backlink" href="#">
              <span class="nhsuk-u-visually-hidden">Back to &nbsp;</span>
              Subsection
            </a>
          </p>
        </div>
      </nav>

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
