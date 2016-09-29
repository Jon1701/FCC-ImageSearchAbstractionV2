// React.
import React from 'react';

import classNames from 'classnames';

// Components.
import SearchForm from './SearchForm.jsx';
import SearchResults from './SearchResults.jsx';

import request from 'superagent';

export default class Search extends React.Component {

  // Component Constructor.
  constructor(props) {
    super(props);

    // Default state.
    //
    //  q: search term
    //  page: page number
    //  results: array of search results
    //  num_results: number of search results.
    this.state = null;

    // Bind methods to component instance.
    this.sendRequest = this.sendRequest.bind(this);

  };

  // Function to send search request to server, pass search query and page number.
  //
  // Stores results in this.state.
  sendRequest(searchString, pageNum) {

    // Reference to this component instance.
    var thisComp = this;

    // Sent request to server.
    request
      .get('/search')
      .query({q: searchString, page: pageNum})
      .end((err, res) => {

        // Error handling.
        if (err) { console.log('error: ' + err); };

        // Parse server response back into JSON.
        res = JSON.parse(res.text);

        // Store server response into state.
        thisComp.setState(res);

      }); // End request.

  };

  // Component render.
  render() {

    var myClasses = classNames({
      'hidden': this.props.tabId != this.props.currentTab
    });

    return (
      <div className={myClasses}>

        <div id="section-search" className="boxshadow padding-10">
          <SearchForm sendRequest={this.sendRequest}/>
        </div>

        <div>
          <SearchResults latestResponse={this.state} sendRequest={this.sendRequest}/>
        </div>

      </div>
    );
  };

};
