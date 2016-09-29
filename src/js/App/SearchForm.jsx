import React from 'react';

export default class SearchForm extends React.Component {

  // Component Constructor.
  constructor(props) {
    super(props);

    // Default state.
    // Form validation.
    this.state = {
      isValid: false
    };

    // Bind methods to component instance.
    this.performSearch = this.performSearch.bind(this);
    this.validateForm = this.validateForm.bind(this);
  };

  // Function to determine if the form is valid.
  validateForm() {

    // Get the search string.
    var searchString = document.querySelector('#form-search > input[type="text"]').value;

    // By deafault, form is invalid.
    var isValid = false;

    // Check if the search box is of at least length 3 not including whitespace.
    if (searchString.trim().length >= 3) {
      isValid = true;
    };

    // Update validation flag in state.
    this.setState({
      isValid: isValid
    });

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
          <input type="text" onChange={this.validateForm} placeholder="Enter some keywords"/>
          <button type="submit" onClick={this.performSearch} disabled={this.state.isValid == false}>Go</button>
        </form>

      </div>
    );
  };

};
