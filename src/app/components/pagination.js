import { Component } from "react"

export default class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "list": [{}, {}, {}, {}, {}, {}, {}],
      "partitionSize": 5, // Default 10
      "partitions": 0,
      "indices": [],
      "currentPage": 1,
    }

    this.onPrevHandler = this.onPrevHandler.bind();
    this.onNextHandler = this.onNextHandler.bind();
  }

  componentDidMount() {
    const { list, partitionSize } = this.state;
    const newPartitions = this.getPartitions(list, partitionSize);
    const newIndices = this.getIndices(newPartitions);
    this.setState({
      partitions: newPartitions,
      indices: newIndices
    })
  }

  getPartitions(list, partitionSize) {
    if (list.length < partitionSize) {
      return 1;
    } else {
      if (list.length % partitionSize === 0) {
        return list.length / partitionSize;
      } else {
        return Math.ceil(list.length / partitionSize);
      }
    }
  }

  getIndices(partitions) {

  }

  onPrevHandler(e) {
    console.log('prev');
  }

  onNextHandler(e) {
    console.log('next');
  }

  render() {
    const { list, partitionSize, partitions, indices, currentPage } = this.state;
    return (
      <div class="nhsuk-width-container">
        <ul class="nhsuk-footer__list">
          <li class="nhsuk-footer__list-item" id="prevButton">
            <a
              aria-label="Previous page - « Previous"
              class="style_link__ToZGL style_current__K8c2u"
              href=""
              onClick={(e) => this.onPrevHandler(e)}
            >
              « Previous
            </a>
          </li>
          <li class="nhsuk-footer__list-item">
            <a
              aria-label="Goto Page 1"
              class="style_link__ToZGL style_current__K8c2u"
              href="/future-standards?orderBy=name&amp;order=asc&amp;page=1"
              aria-current="page"
            >
              1
            </a>
          </li>
          <li class="nhsuk-footer__list-item">
            <a
              aria-label="Goto Page 2"
              class="style_link__ToZGL"
              href="/future-standards?orderBy=name&amp;order=asc&amp;page=2"
            >
              2
            </a>
          </li>
          <li class="nhsuk-footer__list-item" id="nextButton">
            <a
              aria-label="Next page"
              class="style_link__ToZGL"
              href=""
              onClick={(e) => this.onNextHandler(e)}
            >
              Next »
            </a>
          </li>
        </ul>
        <div class="nhsuk-footer__copyright">
          <span index="0" node="[object Object]">
            {`Showing ${currentPage} - ${partitions} of ${list.length} results`}
          </span>
        </div>
      </div>
    )
  }
}
