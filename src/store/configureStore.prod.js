import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
// import { createLogger } from 'redux-logger';
import appReducer from 'reducers';

// must be the last middleware in chain
// const logger = createLogger({
//   duration: true,
//   predicate: (getState, action) => {
//     const hiddenTypes = [];
//     return !hiddenTypes.some(type => type === action.type);
//   }
// });

// const middleware = [thunk, promise(), logger];
const middleware = [thunk, promise()];

const configureStore = (preloadedState = {}) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose;

  return createStore(
    appReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middleware))
  );
};

export default configureStore;