import React from 'react';

export default class PaginationControls extends React.Component {

  // Component Constructor.
  constructor(props) {
    super(props);

    // Bind methods to component instance.
    this.previousResults = this.previousResults.bind(this);
    this.nextResults = this.nextResults.bind(this);
  };

  // Function to return the previous page of results from Imgur.
  previousResults() {

    // Current query.
    var query = this.props.latestResponse.q;
    var pageNum = this.props.latestResponse.page;

    // Check to prevent page number from going negative.
    if (pageNum - 1 <= 0) {

      // If page num will be negative, reset to page 1.
      pageNum = 1;

    } else {

      // Set previous page.
      pageNum = pageNum - 1;

    };

    // Make another request to server, but for the previous page.
    this.props.sendRequest(query, pageNum)
  };

  // Function to return the next page of results from Imgur.
  nextResults() {

    // Current query.
    var query = this.props.latestResponse.q;
    var pageNum = this.props.latestResponse.page + 1;

    // Make another request to server, but for the previous page.
    this.props.sendRequest(query, pageNum);

  };

  // Component render.
  render() {

    return (
      <div id="section-pagination-controls" className="boxshadow">
        <button onClick={this.previousResults}>Previous</button>
        <button onClick={this.nextResults}>Next</button>
      </div>
    );
  };

};
