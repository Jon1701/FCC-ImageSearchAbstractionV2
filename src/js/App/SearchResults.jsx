import React from 'react';

import PaginationControls from './PaginationControls.jsx';
import Gallery from './Gallery.jsx';


export default class SearchResults extends React.Component {

  // Component Constructor.
  constructor(props) {
    super(props);
  };

  // Component render.
  render() {

    return (
      <div id="section-search-results">
        <PaginationControls/>
        <Gallery/>
      </div>
    );
  };

};
