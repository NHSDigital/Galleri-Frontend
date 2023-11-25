import React from 'react';
import { usePagination, DOTS } from './usePagination';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0) {
    return null;
  }
  else if (paginationRange.length < 2){
    return(
        <nav class="nhsuk-pagination style_pagination__7B72Z" aria-label="Pagination Navigation">
    <div class="style_summary__J3_1h">
          <span index="0" node="[object Object]">
            {`Showing ${currentPage*pageSize-pageSize+1}-${currentPage*pageSize<totalCount?currentPage*pageSize:totalCount} of ${totalCount} results`}
          </span>
        </div>
        </nav>
    )
  }
  let lastPage = paginationRange[paginationRange.length - 1];

  const onNext = () => {
    if(currentPage!==lastPage)
        onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if(currentPage!==1)
    onPageChange(currentPage - 1);
  };

  return (
    <nav class="nhsuk-pagination style_pagination__7B72Z" aria-label="Pagination Navigation">
        <div class="style_summary__J3_1h">
          <span index="0" node="[object Object]">
            {`Showing ${currentPage*pageSize-pageSize+1}-${currentPage*pageSize<totalCount?currentPage*pageSize:totalCount} of ${totalCount} results`}
          </span>
        </div>
        <h2 class="nhsuk-u-visually-hidden">Support links</h2>
        <ul>
          <li class="style_item__Y9BLA" id="prevButton">
            <a
              aria-label="Previous page"
              class="style_link__ToZGL"
              onClick={onPrevious}
            >
              « Previous
            </a>
          </li>
          {paginationRange.map(pgNumber => (
                    <li key={pgNumber}
                        class="style_item__Y9BLA"
                        >
                        <a onClick={() => onPageChange(pgNumber)}
                          class = "style_link__ToZGL">
                          {pgNumber}
                        </a>
                    </li>
                ))}
          <li class="style_item__Y9BLA" id="nextButton">
            <a
              aria-label="Next page"
              class="style_link__ToZGL"
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
