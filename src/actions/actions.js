import Dispatcher from '../dispatchers/dispatcher';
import { DataActions, PaginationActions, FeedbackActions } from '../constants/constants';
import DataGateway from '../data/dataGateway';

class ActionBase{
  constructor(type,payload = null){
    this.type = type;
    this.payload = payload;
  }
}

function loadData () {
  Dispatcher.dispatch(new ActionBase(DataActions.REQUEST_DATA_LIST));
  DataGateway
    .loadRecentDataList()
    .then(data => {
      Dispatcher.dispatch(new ActionBase(DataActions.REQUEST_DATA_LIST, data));
    })
    .then(() => {
      Dispatcher.dispatch(new ActionBase(DataActions.REQUEST_DATA_ITEM));
      return DataGateway.loadDataById(14758925);
    })
    .then(data => {
      Dispatcher.dispatch(new ActionBase(DataActions.RECEIVE_DATA_ITEM, data));
    });
}

function nextPage () {
  let nextPageAction = new ActionBase();
  Dispatcher.dispatch(nextPageAction);
}

function prevPage () {
  let prevPageAction = new ActionBase();
  Dispatcher.dispatch(prevPageAction);
}

function addToFavorites () {
  let addToFavoritesAction = new ActionBase();
  Dispatcher.dispatch(addToFavoritesAction);
}

export default {
  loadData,
  nextPage,
  prevPage,
  addToFavorites
};
