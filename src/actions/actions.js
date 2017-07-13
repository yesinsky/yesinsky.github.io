import Dispatcher from '../dispatchers/dispatcher';
import { DataActions, PaginationActions, FeedbackActions } from '../constants/constants';
import DataGateway from '../data/dataGateway';

function loadData () {
  Dispatcher.dispatch(DataActions.REQUEST_DATA);
  DataGateway
    .loadRecentDataList()
    .then(data => {
      Dispatcher.dispatch(DataActions.RECEIVE_DATA, data);
    })
    .then(() => {
      Dispatcher.dispatch(DataActions.REQUEST_DATA);
      return DataGateway.loadDataById(14758925);
    })
    .then(data => {
      Dispatcher.dispatch(DataActions.RECEIVE_DATA, data);
    });
}

function nextPage () {
  let nextPageAction = {
    actionType: PaginationActions.NEXT_PAGE
  };
  Dispatcher.dispatch(nextPageAction);
}

function prevPage () {
  let prevPageAction = {
    actionType: PaginationActions.PREV_PAGE
  };
  Dispatcher.dispatch(prevPageAction);
}

function addToFavorites () {
  let addToFavoritesAction = {
    actionType: FeedbackActions.ADD_TO_FAVORITES
  };
  Dispatcher.dispatch(addToFavoritesAction);
}

export default {
  loadData,
  nextPage,
  prevPage,
  addToFavorites
};
