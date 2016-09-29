import React from 'react';

import classNames from 'classnames';

import PaginationControls from './PaginationControls.jsx';
import Gallery from './Gallery.jsx';


export default class SearchResults extends React.Component {

  // Component Constructor.
  constructor(props) {
    super(props);
  };

  // Component render.
  render() {

    // Control visibility of this component.
    //
    // Hidden if this.props.latestReponse is null.
    var myClasses = classNames({
      'hidden': this.props.latestResponse == null
    });

    return (
      <div id="section-search-results" className={myClasses}>
        <PaginationControls latestResponse={this.props.latestResponse} sendRequest={this.props.sendRequest}/>

        <Gallery latestResponse={this.props.latestResponse}/>

        <div className="clearfix"/>

        <PaginationControls latestResponse={this.props.latestResponse} sendRequest={this.props.sendRequest}/>
      </div>
    );
  };

};
