import API from './requestingApi';

const baseApiLink = 'https://hacker-news.firebaseio.com/v0/';

function loadRecentDataList () {
  const recentLink = 'newstories.json?print=pretty';
  return API
    .get(baseApiLink + recentLink)
    .then(
      response => response.json(),
      error => console.log('Error', error)
    );
}

function loadDataById (id) {
  const itemLink = `item/${id}.json?print=pretty`;
  return API
    .get(baseApiLink + itemLink)
    .then(
      response => response.json(),
      error => console.log('Error', error)
    );
}

export default {
  loadRecentDataList,
  loadDataById
};
