// React.
import React from 'react';
import classNames from 'classnames';

import request from 'superagent';

export default class ApiUsage extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Default state.
    this.state = {
      hostname: null  // Server hostname.
    };
  };

  componentWillMount() {

    // Get hostname of the server.
    request
      .get('/hostname')
      .end((err, res) => {

        // Parse server response into JSON.
        res = JSON.parse(res.text);

        // Store hostname in state.
        this.setState({
          hostname: res.hostname
        });

      });

  };

  // Component Render.
  render() {

    // Classes used for this component.
    var myClasses = classNames({
      'hidden': this.props.tabId != this.props.currentTab,
      'boxshadow': true,
      'padding-10': true
    });

    return (
      <div id="section-api-usage" className={myClasses}>

        <h2 className="text-center">API Endpoints</h2>

        <h3>Search</h3>
        <p>Returns at most 60 images matching a specific query.</p>
        <ul>
          <li>Method: <span className="code">GET</span></li>
          <li>Routes:</li>
            <ul>
              <li className="code">{this.state.hostname + '/search?q=\{query\}'}</li>
              <li className="code">{this.state.hostname + '/search?q=\{query\}&page=\{pageNum\}'}</li>
            </ul>
          <li>Parameters:</li>
            <ul>
              <li>
                <span className="code">query</span>: search for images matching this query
                <span className="italic">(string, required)</span>
              </li>
              <li>
                <span className="code">pageNum</span>: the data paging number
                <span className="italic">(integer, optional)</span>
              </li>
            </ul>
        </ul>

        <h3>Recent Searches</h3>
        <p>Returns the 50 most recent queries.</p>
        <ul>
          <li>Method: <span className="code">GET</span></li>
          <li>Routes:</li>
            <ul>
              <li className="code">{this.state.hostname + '/recent'}</li>
            </ul>
          <li>Parameters: None</li>
        </ul>

      </div>
    )
  };// End Component Render.

};
