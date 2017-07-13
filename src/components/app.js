import React from 'react';
import Actions from '../actions/actions';

export default class App extends React.Component {
  render () {
    return (
      <div className="testing">
        <h1 onClick={Actions.loadData}>Load data</h1>
      </div>);
  }
}
