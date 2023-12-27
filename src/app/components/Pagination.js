const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};

const DOTS = "...";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const fetchPageNumbers = () => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /*
      We do not want to show dots if there is only one position left
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  };

  const paginationRange = fetchPageNumbers();

  if (currentPage === 0) {
    return null;
  } else if (paginationRange.length < 2) {
    return (
      <nav
        className="nhsuk-pagination style_pagination__7B72Z"
        aria-label="Pagination Navigation"
      >
        <div className="style_summary__J3_1h">
          <span index="0" node="[object Object]">
            {`Showing ${currentPage * pageSize - pageSize + 1}-${
              currentPage * pageSize < totalCount
                ? currentPage * pageSize
                : totalCount
            } of ${totalCount} results`}
          </span>
        </div>
      </nav>
    );
  }
  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    if (currentPage !== lastPage) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage !== 1) onPageChange(currentPage - 1);
  };

  return (
    <nav
      className="nhsuk-pagination style_pagination__7B72Z"
      role="navigation"
      aria-label="Pagination Navigation"
    >
      <output className="style_summary__J3_1h" aria-live="polite">
        <span index="0" node="[object Object]">
          {`Showing ${currentPage * pageSize - pageSize + 1}-${
            currentPage * pageSize < totalCount
              ? currentPage * pageSize
              : totalCount
          } of ${totalCount} results`}
        </span>
      </output>
      <h2 className="nhsuk-u-visually-hidden">Pagination Support links</h2>
      <ul>
        <li className="style_item__Y9BLA" id="prevButton">
          <a
            aria-label="Previous page: « Previous"
            className={`nhsuk-pagination__link style_link__ToZGL ${
              currentPage == 1 ? "style_current__K8c2u" : ""
            } `}
            href="#"
            onClick={onPrevious}
          >
            « Previous
          </a>
        </li>
        {paginationRange.map((pgNumber, index) => {
          if (pgNumber === DOTS) {
            return <li key="dots" className="style_item__Y9BLA dots">&#8230;</li>;
          }
          return (
            <li
              key={
                pgNumber !== DOTS
                  ? `dots-between-${
                      paginationRange[index - 1] || "start"
                    }-and-${paginationRange[index + 1] || "end"}`
                  : `page-${pgNumber}`
              }
              className="style_item__Y9BLA"
            >
              <a
                onClick={() => onPageChange(pgNumber)}
                href="#Table"
                aria-label={`Go to Page ${pgNumber}`}
                className={`style_link__ToZGL ${
                  currentPage == pgNumber ? "style_current__K8c2u" : ""
                } `}
              >
                {pgNumber}
              </a>
            </li>
          );
        })}
        <li className="style_item__Y9BLA" id="nextButton">
          <a
            aria-label="Next page: Next »"
            href="#"
            className={`nhsuk-pagination__link style_link__ToZGL ${
              currentPage == lastPage ? "style_current__K8c2u" : ""
            } `}
            onClick={onNext}
          >
            Next »
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
