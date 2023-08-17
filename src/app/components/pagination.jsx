export default function pagination(list, split, onNextHandler, onPrevHandler) {
  return (
    <nav class="govuk-pagination" role="navigation" aria-label="results">
      <div class="govuk-pagination__prev">
        <a class="govuk-link govuk-pagination__link" href="#" rel="prev">
          <svg
            class="govuk-pagination__icon govuk-pagination__icon--prev"
            xmlns="http://www.w3.org/2000/svg"
            height="13"
            width="15"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 15 13"
          >
            <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
          </svg>
          <span class="govuk-pagination__link-title">Previous</span>
        </a>
      </div>
      <ul class="govuk-pagination__list">
        <li class="govuk-pagination__item">
          <a
            class="govuk-link govuk-pagination__link"
            href="#"
            aria-label="Page 1"
          >
            1
          </a>
        </li>
        <li class="govuk-pagination__item govuk-pagination__item--ellipses">
          &ctdot;
        </li>
        <li class="govuk-pagination__item">
          <a
            class="govuk-link govuk-pagination__link"
            href="#"
            aria-label="Page 42"
          >
            5
          </a>
        </li>
      </ul>
      <div class="govuk-pagination__next">
        <a class="govuk-link govuk-pagination__link" href="#" rel="next">
          {" "}
          <span class="govuk-pagination__link-title">Next</span>{" "}
          <svg
            class="govuk-pagination__icon govuk-pagination__icon--next"
            xmlns="http://www.w3.org/2000/svg"
            height="13"
            width="15"
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 15 13"
          >
            <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
          </svg>
        </a>
      </div>
    </nav>
  );
}
