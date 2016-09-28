import React from 'react';

// Components.
import Jumbotron from './Jumbotron.jsx';
import Search from './Search.jsx';

export default class App extends React.Component {

  // Component Constructor.
  constructor(props) {
    super(props);
  };

  // Component render.
  render() {
    return (
      <div>
        <Jumbotron/>
        <Search/>
      </div>
    );
  };

};
