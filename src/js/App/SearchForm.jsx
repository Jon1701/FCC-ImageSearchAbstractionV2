import React from 'react';

export default class SearchForm extends React.Component {

  // Component Constructor.
  constructor(props) {
    super(props);

    // Bind methods to component instance.
    this.performSearch = this.performSearch.bind(this);
  };

  // Sends a request to the server to perform an image search.
  performSearch(e) {

    // Prevent default form submission action.
    e.preventDefault();

    // Get the search string.
    var searchString = document.querySelector('#form-search > input[type="text"]').value;

    // Send request to server, store results in parent state.
    this.props.sendRequest(searchString, 1);

  }; // End performSearch().

  // Component render.
  render() {

    return (
      <div id="section-search-form">

        <form id="form-search">
          <input type="text" placeholder="Enter some keywords" defaultValue="star trek"/>
          <button type="submit" onClick={this.performSearch}>Go</button>
        </form>

      </div>
    );
  };

};
