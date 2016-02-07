import React from 'react';
import {IndexRoute, Route, Router, browserHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import {
    App,
    Home,
    Section,
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
      <Route path="section/:sectionId" component={Section} />
    </Route>
    <Route path="*" component={NotFound} status={404} />
  </Router>
);

export default routes;