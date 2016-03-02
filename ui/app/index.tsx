import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

import { Main } from './components/main';
import { Dashboard } from './components/dashboard';

window['React'] = React;

require('./style/mdl.global.scss');
require('react-mdl/extra/material.js');

render(
  (
    <Router>
      <Route path='/' component={Main}>
        <Route path=':id' component={Dashboard} />
      </Route>
    </Router>
  ),
  document.getElementById('app')
);
