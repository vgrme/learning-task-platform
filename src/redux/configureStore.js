//This file merely configures the store for hot reloading.
//This boilerplate file is likely to be the same for each project that uses Redux.
//With Redux, the actual stores are in /reducers.

import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import clientMiddleware from './middleware/clientMiddleware';
import rootReducer from './reducer';
import createLogger from 'redux-logger';
import ApiClient from 'helpers/ApiClient';

export default function configureStore(initialState) {
  const client = new ApiClient();
  const reduxRouterMiddleware = syncHistory(browserHistory);

  let finalCreateStore;
  if(process.env.NODE_ENV && process.env.NODE_ENV === "development"){
    const { persistState } = require('redux-devtools');
    const DevTools = require('../containers/DevTool');

    finalCreateStore = compose(
      applyMiddleware(reduxRouterMiddleware, clientMiddleware(client), createLogger()),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  }
  else{
    finalCreateStore = compose(
      applyMiddleware(reduxRouterMiddleware, clientMiddleware(client))
    )(createStore);
  }

  //finalCreateStore = reduxReactRouter({ getRoutes, createHistory })(finalCreateStore);

  const store = finalCreateStore(rootReducer, initialState);

  reduxRouterMiddleware.listenForReplays(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
