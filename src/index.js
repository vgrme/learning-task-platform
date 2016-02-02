import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './redux/configureStore';

import routes from './routes';
import makeRouteHooksSafe from './helpers/makeRouteHooksSafe';

import './styles/styles.scss'; //Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.


const store = configureStore();
const dest = document.getElementById('app');


ReactDOM.render(
  <Provider store={store} key="provider">
    {routes}
  </Provider>,
  dest
);

if (__DEV__ && __DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTool');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {routes}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
