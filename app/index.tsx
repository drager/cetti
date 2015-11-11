import * as React from 'react';
import {render} from 'react-dom';
import {Router, Route} from 'react-router';

import {NavBar} from './components/navbar';

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
        <main style={styles.main}></main>
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
