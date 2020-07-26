import React, { useState } from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleCounterClickIncrement = this.handleCounterClickIncrement.bind(
      this
    );
    this.handleCounterClickDecrement = this.handleCounterClickDecrement.bind(
      this
    );
  }
  handleCounterClickIncrement = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  handleCounterClickDecrement = () => {
    if (this.state.counter === 0) return;
    this.setState({ counter: this.state.counter - 1 });
  };
  render() {
    return (
      <div className='App' data-test='component-app'>
        <h1 data-test='counter-display'>The counter is {this.state.counter}</h1>
        <button
          data-test='increment-button'
          onClick={this.handleCounterClickIncrement}
        >
          Increment
        </button>
        <button
          data-test='decrement-button'
          onClick={this.handleCounterClickDecrement}
        >
          Decrement
        </button>
      </div>
    );
  }
}

export default App;
