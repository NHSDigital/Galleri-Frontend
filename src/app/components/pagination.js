const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }
    return range;
};

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize
  } = props;

  const fetchPageNumbers = () => {
    const totalPages = Math.ceil(props.totalCount / props.pageSize);
    const currentPage = props.currentPage;
    const pageNeighbours = props.siblingCount;

    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  const paginationRange = fetchPageNumbers();

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
                        /*class= {`style_current__K8c2u ${currentPage == pgNumber ? 'active' : ''} `} */
                        // className={
						// 	' style_current__K8c2u' + (pgNumber === currentPage ? 'active' : '')
						// }
                        >
                           <a onClick={() => onPageChange(pgNumber)}  
                              class = "style_link__ToZGL" >
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