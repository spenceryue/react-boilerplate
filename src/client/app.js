import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import style from './index.css';
// Reloading of this is finicky.
// Try using tutorial:
// https://blog.cloudboost.io/live-reload-hot-module-replacement-with-webpack-middleware-d0a10a86fc80#bc80

@hot(module)
export default class App extends Component {
  state = {
    color: 'white',
    count: 0,
  };
  changeColor = () => {
    this.setState(state => {
      console.log('clicked!', state);
      const color = state.color == 'white' ? 'red' : 'white';
      const count = state.count + 1;
      return { color, count };
    });
  };
  render() {
    // console.log('hi');
    return (
      <div onClick={this.changeColor} style={{ color: this.state.color }}>
        React Boilerplate!
      </div>
    );
  }
}
