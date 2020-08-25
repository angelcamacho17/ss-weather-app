import React, { Component } from 'react';
import './App.css';
import WeekContainer from './week-container/WeekContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <WeekContainer />
      </div>
    );
  }
}

export default App;