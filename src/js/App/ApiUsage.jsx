// React.
import React from 'react';
import classNames from 'classnames';

export default class ApiUsage extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);
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
        Api Usage
      </div>
    )
  };// End Component Render.

};
