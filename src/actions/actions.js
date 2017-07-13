import Dispatcher from '../dispatchers/dispatcher';
import { DataActions, PaginationActions, FeedbackActions } from '../constants/constants';
import DataGateway from '../data/dataGateway';

class ActionBase{
  constructor(type,payload = null){
    this.type = type;
    this.payload = payload;
  }
}

function initialDataLoaded(){
  let initialDataLoadedAction = new ActionBase();
  Dispatcher.dispatch(initialDataLoadedAction);
}

function nextPage () {
  let nextPageAction = new ActionBase(PaginationActions.NEXT_PAGE);
  Dispatcher.dispatch(nextPageAction);
}

function prevPage () {
  let prevPageAction = new ActionBase(PaginationActions.PREV_PAGE);
  Dispatcher.dispatch(prevPageAction);
}

function addToFavorites (id) {
  let addToFavoritesAction = new ActionBase(FeedbackActions.TOGGLE_FAVORITES, id);
  Dispatcher.dispatch(addToFavoritesAction);
}

export default {
  nextPage,
  prevPage,
  addToFavorites
};
