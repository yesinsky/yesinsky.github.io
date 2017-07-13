import Dispatcher from '../dispatchers/dispatcher';
import { DataActions, PaginationActions, FeedbackActions } from '../constants/constants';
import DataGateway from '../data/dataGateway';
import { EventEmitter } from 'events';
import Post from '../data/dto/postDto'

class AppStoreState {
  constructor() {
    this.ids = new Array();
    this.data = new Array();

    this.totalPages = 0;
    this.currentPage = 1;
    this.currentItems = new Array();
    this.itemsOnPage = 10;

    this.likedItems = new Array();
  }

  tryNextPage(){
    let candidate = (this.currentPage + 1);
    let isValid = candidate <= this.totalPages;
    this.currentPage = isValid ? candidate : this.totalPages;
    return isValid;
  }

  tryPrevPage(){
    let candidate = (this.currentPage - 1);
    let isValid = candidate >= 1;
    this.currentPage =  isValid ? candidate : 1;
    return isValid;
  }
}
class AppStore extends EventEmitter {

  constructor() {
    super();
    this.changeEvent = 'CHANGE';

    this.state = new AppStoreState();
    this.dispatcherIndex = Dispatcher.register((callback) => this.onDispatch(callback));

    this.loadMetadata(this.state)
    .then(() => this.loadData(this.state))

  }

  loadMetadata(state){
      return DataGateway
      .loadRecentDataList()
      .then(idsArr => {
         state.ids = idsArr;
         state.totalPages = Math.ceil(idsArr.length/state.itemsOnPage);
      })
  }

  loadData(state) {
    let start = (state.currentPage - 1) * state.itemsOnPage;
    let end = start + state.itemsOnPage;
    let idsForPage = state.ids.slice(start, end);
    return Promise
      .all(idsForPage.map((id) => DataGateway.loadDataById(id).then(data => new Post(data))))
      .then((data) => {
        state.currentItems = data;
        Dispatcher.dispatch(DataActions.INITIAL_DATA_LOADED);
      });
  }

  getState(){
    return this.state;
  }

  emitChange(){
    this.emit( this.changeEvent )
  }

  addChangeListener( callback ){
    this.on( this.changeEvent, callback )
  }

  removeChangeListener( callback ){
    this.removeListener( this.changeEvent, callback )
  }

  onDispatch(action) {
    switch (action.type) {
      case(DataActions.INITIAL_DATA_LOADED):
        break;
      case (PaginationActions.NEXT_PAGE):
        if(this.state.tryNextPage()){
          this.loadData(this.state);
        }
        break;
      case (PaginationActions.PREV_PAGE):
        if(this.state.tryPrevPage()){
          this.loadData(this.state);
        }
        break;
      case (FeedbackActions.TOGGLE_FAVORITES):
        let found = this.state.likedItems.indexOf(action.payload);
        if (found >= 0) {
          this.state.likedItems.splice(found, 1);
        } else {
          this.state.likedItems.push(action.payload);
        }
    }
    this.emitChange();
  }

}

export default new AppStore(Dispatcher);
