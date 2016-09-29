import React from 'react';

// Components.
import Jumbotron from './Jumbotron.jsx';
import Search from './Search.jsx';
import Tab from './Tab.jsx';
import ApiUsage from './ApiUsage.jsx';

export default class App extends React.Component {

  // Component Constructor.
  constructor(props) {
    super(props);

    // Default state.
    this.state = {
      currentTab: 0,   // ID of the current tab.
    };

    // Bind methods to component instance.
    this.handleUpdateCurrentTab = this.handleUpdateCurrentTab.bind(this);
  };

  // Callback to update current tab.
  handleUpdateCurrentTab(tabId) {
    this.setState({
      currentTab: tabId
    });
  }; // End callback to update current tab.

  // Component render.
  render() {
    return (
      <div>
        <Jumbotron/>

        <div>
          <div className="container-tabs boxshadow">

            <Tab
              tabId={0}
              currentTab={this.state.currentTab}
              label={"Web Usage"}
              handleUpdateCurrentTab={this.handleUpdateCurrentTab}
              />

            <Tab
              tabId={1}
              currentTab={this.state.currentTab}
              label={"API Usage"}
              handleUpdateCurrentTab={this.handleUpdateCurrentTab}
              />

            <div className="clearfix"/>

          </div>

          <div className="container-results tab-contents-active">

            <Search tabId={0} currentTab={this.state.currentTab}/>

            <ApiUsage tabId={1} currentTab={this.state.currentTab}/>

          </div>
        </div>



      </div>
    );
  };

};
