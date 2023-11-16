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
              <p>Use this service to do invite eligible population for screening.</p>
              <p>You can use this service if the participants:</p>
              <ul>
                <li>live in England</li>
                <li>eligible for screening</li>
              </ul>

              <h2>Before you start</h2>

              <p>We'll ask you for: ...</p>

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
