import React from 'react';

export default class Jumbotron extends React.Component {

  // Component Constructor.
  constructor(props) {
    super(props);
  };

  // Component render.
  render() {
    return (
      <div id="section-jumbotron" className="boxshadow padding-10">
        <h1 className="text-center clear-margins">Imgur Search Service</h1>
      </div>
    );
  };

};
