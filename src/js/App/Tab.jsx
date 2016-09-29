// React.
import React from 'react';
import classNames from 'classnames';

export default class Tab extends React.Component {

  // Constructor.
  constructor(props) {
    super(props);

    // Bind methods to component instance.
    this.setCurrentTab = this.setCurrentTab.bind(this);
  };

  // Function to set current tab to the tab ID of this component.
  setCurrentTab() {
    this.props.handleUpdateCurrentTab(this.props.tabId);
  };

  // Component Render.
  render() {

    // Classes used for this component.
    var myClasses = classNames({
      'text-center': true,
      'tab': true,
      'tab-active': this.props.tabId == this.props.currentTab
    });

    return (
      <div className={myClasses} onClick={this.setCurrentTab}>
        {this.props.label}
      </div>
    )
  };// End Component Render.

};

// Prop types.
Tab.propTypes = {
  tabId: React.PropTypes.number.isRequired,
  currentTab: React.PropTypes.number.isRequired,
  label: React.PropTypes.string.isRequired,
  handleUpdateCurrentTab: React.PropTypes.func.isRequired
};
