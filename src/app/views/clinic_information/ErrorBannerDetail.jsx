import "../../styles/css/sass.css";
import React from "react";
export default function ErrorBannerDetail(props) {
  const {
    targetErrorMessage,
    onKeyUp,
  } = props;
  return (
    <div
      data-testid="error-banner"
      class="nhsuk-error-summary nhsuk-u-padding-bottom-0"
      aria-labelledby="error-summary-title"
      role="alert"
      tabindex="-1"
      onKeyDown={e => onKeyUp(e)}
    >
      <h2
        class="nhsuk-error-summary__title nhsuk-u-margin-bottom-2"
        id="error-target-title"
      >
        There is a problem
      </h2>
      <div class="nhsuk-error-summary__body">
        <ul class="nhsuk-list nhsuk-error-summary__list" role="list">
          <li>
            <a
              href="#error-message"
            >
              {targetErrorMessage}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
