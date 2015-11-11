import * as React from 'react';
import { render } from 'react-dom';
import { Router, Route } from 'react-router';

import { Activity } from './entites';

import { NavBar } from './components/nav-bar';
import { Stream } from './components/stream';

const styles = Object.freeze({
  main: {
    flex: 1,
    fontFamily: 'Roboto',
  },
});

class App extends React.Component<{children: JSX.Element}, {}> {
  private activities: Activity[];

  constructor() {
    super();

    this.activities = [
      {
        id: 1,
        title: `./app/components/card-list.tsx
                (9,3): error TS2377: Constructors for derived classes must contain a 'super' call.`,
        timesOccurred: 5,
        timeOfOccurence: '2015-11-10 09:39:42',
      },
      {
        id: 2,
        title: `./app/components/card-list.tsx(54,43): error TS1005: ':' expected.`,
        timesOccurred: 1,
        timeOfOccurence: '2015-11-10 10:59:22',
      },
    ];
  }

  render() {
    return (
      <div>
        <NavBar />
        <main style={styles.main}>
          <Stream activities={this.activities} />
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
