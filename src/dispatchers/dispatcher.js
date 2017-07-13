import { Dispatcher } from 'flux';

class DispatcherDecorator extends Dispatcher {
  constructor () {
    super();
    this.dispatcher = new Dispatcher();
  }

  register (callback) {
    return this.dispatcher.register(callback);
  }

  dispatch (actionType, action) {
    console.log(actionType);
    console.log(action);
    return this.dispatcher.dispatch(actionType, action);
  }
}

export default new DispatcherDecorator();
