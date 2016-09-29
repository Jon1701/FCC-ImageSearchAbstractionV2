import React from 'react';

export default class Gallery extends React.Component {

  // Component Constructor.
  constructor(props) {
    super(props);
  };

  // Component render.
  render() {

    // Will hold the rendered HTML of all the photos returned by the search.
    var html;

    // Pupulate html variable if a search was done prior.
    if (this.props.latestResponse) {

      // Images returned by search results.
      var results = this.props.latestResponse.results;

      // Build an array of HTML structure for each image.
      html = results.map((image, idx, arr) => {

        // Unique key to suppress React warnings.
        var key = image.link + '_' + idx;

        return (
          <div key={key} className="container-search-result col-xs-12 col-sm-6 col-md-4 col-lg-3 boxshadow padding-10">
            <a href={image.link} target="_blank">
              <img src={image.link} className="img-responsive thumbnail" alt={image.title}/>
            </a>
          </div>
        );
      });

    };

    return (
      <div id="section-gallery">
          {html}
      </div>
    );
  };

};
