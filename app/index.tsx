import * as React from 'react';
import {render} from 'react-dom';
import {Link, Router, Route} from 'react-router';

import {Hello} from './components/hello';

class App extends React.Component<{children: JSX.Element}, {}> {

  render() {
    return (
      <div>
        <Link to='/hello'>Hello</Link>
        {this.props.children}
      </div>
    );
  }
}

render(
  (
    <Router>
      <Route path='/' component={App}>
        <Route path='hello' component={Hello} />
      </Route>
    </Router>
  ),
  document.getElementById('app')
);
