import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

import { NavBar } from './components/nav-bar';
import { Stream } from './components/stream';

const styles = Object.freeze({
  main: {
    flex: 1,
    fontFamily: 'Roboto',
  },
});

class App extends React.Component<{children: JSX.Element}, {}> {

  render() {
    return (
      <div>
        <NavBar />
        <main style={styles.main}>
          <Stream />
          {this.props.children}
        </main>
      </div>
    );
  }
}

render(
  (
    <Router>
      <Route path='/' component={App}>
      </Route>
    </Router>
  ),
  document.getElementById('app')
);
