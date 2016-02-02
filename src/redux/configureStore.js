//This file merely configures the store for hot reloading.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.

import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducer';

export default function configureStore(initialState) {
  let finalCreateStore;
  if(process.env.NODE_ENV && process.env.NODE_ENV){
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTool');

    finalCreateStore = compose(
      // Middleware you want to use in development:
      // applyMiddleware(d1, d2, d3),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  }
  else{
    finalCreateStore = compose(
      // applyMiddleware(p1, p2, p3),
    )(createStore);
  }

  //finalCreateStore = reduxReactRouter({ getRoutes, createHistory })(finalCreateStore);

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
