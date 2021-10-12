import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../modules';

export default function configureStore() {
  const middlewares = [thunk];
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = devTools || compose;
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  return store;
};