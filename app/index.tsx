/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

// Temporary disable lint warning here. Waiting for tslint 2.5.2...

import { render } from 'react-dom';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';

import Main from './components/main';

render(
  (
    <Provider store={store}>
      <Router>
        <Route path='/' component={Main}>
        </Route>
      </Router>
   </Provider>
  ),
  document.getElementById('app')
);
