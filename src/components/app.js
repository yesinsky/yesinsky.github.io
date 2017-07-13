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
    let storeState  = AppStore.getState();
    this.setState({items: storeState.currentItems, liked: storeState.likedItems});
  }

  render() {
    if(!this.state.items) return <span>Fancy loading spinner imitation</span>;
    let items = this.state.items.map(item => {
      return (
        <div className="posts__row" key={item.id}>
          <button className="posts__button" onClick={() => Actions.addToFavorites(item.id)}>Like</button>
          <span className={this.state.liked.indexOf(item.id) >= 0 ?
            "posts__text posts__text--liked" :
            "posts__text posts__text--common" }>Post by {item.by}:</span>
          <a className="posts__text posts__text--link" href={item.url} target="_blank">{item.title}</a>
        </div>
      )
    });
    return (
      <div className="container">
        <h1>Hacker-news digest</h1>
        <h2>Sample React-Flux App</h2>
        <section className="posts">
          { items }
          <div className="posts__pagination">
            <button onClick={Actions.prevPage}>Prev</button>
            <button onClick={Actions.nextPage}>Next</button>
          </div>
        </section>
      </div>
      
    );
  }
}
