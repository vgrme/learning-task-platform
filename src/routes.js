import React from 'react';
import {IndexRoute, Route, Router} from 'react-router';
import { browserHistory } from 'react-router';
import { isLoaded as isAuthLoaded, loadAuth } from 'redux/modules/auth';
import cookie from 'react-cookie';

import {
    App,
    Home,
    Section,
    Login,
    NotFound
  } from './containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      const token = cookie.load('token');
      if (!user || !token) {
        // oops, not logged in, so can't be here!
        cookie.save('token', '');
        replace('/login');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      store.dispatch(loadAuth()).then(checkAuth);
    }
  };

  return (
    /**
     * Please keep routes in alphabetical order
     */
    <Router history={browserHistory}>
      <Route path="/" component={App}>{ /* Routes requiring login */ }
        <Route onEnter={requireLogin}>
          { /* Home (main) route */ }
          <IndexRoute component={Home} />
          { /* Routes */ }
          <Route path="section/:sectionId" component={Section} />
        </Route>

        <Route path="login" component={Login}/>
      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Router>
  );
};