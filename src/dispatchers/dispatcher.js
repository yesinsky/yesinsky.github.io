import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
  constructor () {
    super();
    this.dispatcher = new Dispatcher();
  }

  register (callback) {
    return this.dispatcher.register(callback);
  }

  dispatch (payload) {
    return this.dispatcher.dispatch(payload);
  }
}

export default new AppDispatcher();
