import React, { Component } from 'react';
import ToolbarComponent from './components/ToolbarComponent';
import MessagesComponent from './components/MessagesComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ToolbarComponent/>

        <MessagesComponent/>
      </div>
    );
  }
}

export default App;
