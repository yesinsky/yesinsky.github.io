import fetch from 'isomorphic-fetch';

export default {
  get (uri) {
    return fetch(uri);
  },

  post (uri, data) {
    return fetch(uri, {
      method: 'POST',
      body: data
    });
  }
};
