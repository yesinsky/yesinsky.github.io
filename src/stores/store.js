import Dispatcher from '../dispatchers/dispatcher';
import { DataActions, PaginationActions, FeedbackActions } from '../constants/constants';
import DataGateway from '../data/dataGateway';
import { EventEmitter } from 'events';
import PostDto from '../data/dto/postDto'

class AppStoreState {
  constructor() {
    this.ids = new Array();
    this.data = new Array();

    this.currentPage = 0;
    this.currentItems = new Array();
    this.itemsOnPage = 10;
  }
}
class AppStore extends EventEmitter {

  constructor() {
    super();
    this.changeEvent = 'CHANGE';

    this.state = new AppStoreState();
    this.dispatcherIndex = Dispatcher.register((callback) => this.onDispatch(callback));
    this.loadInitialData(this.state);
  }

  loadInitialData(state){
      return DataGateway
      .loadRecentDataList()
      .then(idsArr => { state.ids = idsArr; })
      .then(() => Promise.all(state.ids
          .slice(0, state.itemsOnPage)
          .map((id) => DataGateway.loadDataById(id).then(data => new PostDto(data)))))
      .then((data) => {
          state.currentItems = data;
          Dispatcher.dispatch({ one: "loaded", two: this.state });
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

  onDispatch( action ){
    this.emitChange();
  }

}

export default new AppStore(Dispatcher);
