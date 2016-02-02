import React from 'react';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import {
    App,
    Home,
    NotFound
  } from './containers';

const routes = (

  /**
   * Please keep routes in alphabetical order
   */
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes */ }
      <Route path="/notfound" component={NotFound} />

      <Route path="*" component={NotFound} status={404} />
    </Route>
  </Router>
);

export default routes;