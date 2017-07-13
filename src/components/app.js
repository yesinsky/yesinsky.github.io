import React from 'react';
import Actions from '../actions/actions';
import AppStore from '../stores/store';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.storeListener = null;
  }

  componentWillMount(){
    AppStore.addChangeListener( (callback) => this._onChange(callback) )
  }
  componentWillUnmount(){
    AppStore.removeChangeListener( (callback) => this._onChange(callback) )
  }
  _onChange(callback) {
    this.setState({items: AppStore.getState().currentItems});
  }

  render() {
    if(!this.state.items) return null;
    let items = this.state.items.map(item => {
      return <div key={item.id}>
        <span>Post by {item.by}:</span><a href={item.url}>{item.title}</a>
        </div>
    });
    return (
      <div className="posts">
        { items }
      </div>
    );
  }
}
