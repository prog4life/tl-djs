import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import watcher from 'redux-immutable-state-invariant';
import { createLogger } from 'redux-logger';
// import logger from 'redux-logger'; // to get logger mw with default options
import appReducer from 'reducers';

// must be the last middleware in chain
const logger = createLogger({
  duration: true,
  predicate: (getState, action) => {
    const hiddenTypes = [];
    return !hiddenTypes.some(type => type === action.type);
  },
});

const middleware = process.env.NODE_ENV === 'production'
  ? [thunk, promise()]
  : [watcher(), thunk, promise(), logger];

const configureStore = (preloadedState = {}) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose;

  return createStore(
    appReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware)),
  );
};

export default configureStore;
