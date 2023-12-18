import "../../styles/css/sass.css";
import React from "react";
export default function ErrorBannerDetail(props) {
  const { targetErrorMessage, onKeyUp, hrefErrorMessage } = props;

  return (
    <div
      data-testid="error-banner"
      class="nhsuk-error-summary nhsuk-u-padding-bottom-0"
      role="alert"
      aria-live="polite"
      tabindex="0"
      onKeyDown={(e) => onKeyUp(e)}
    >
      <h2
        class="nhsuk-error-summary__title nhsuk-u-margin-bottom-2"
        id="error-target-title"
      >
        There is a problem
      </h2>
      <div class="nhsuk-error-summary__body">
        <ul class="nhsuk-list nhsuk-error-summary__list">
          <li>
            <a href={`${hrefErrorMessage}`}>{targetErrorMessage}</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
