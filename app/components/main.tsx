import * as React from 'react';

import { Activity } from '../entites';

import { NavBar } from './nav-bar';

const styles = Object.freeze({
  fill: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  main: {
    display: 'flex',
    flex: 1,
    fontFamily: 'Roboto',
  },
});

type Properties = {
  activities: Activity[],
  children: JSX.Element,
};

export default class Main extends React.Component<Properties, any> {

  render() {
    return (
      <div style={styles.fill}>
        <NavBar />
        <main style={styles.main}>
          {this.props.children}
        </main>
      </div>
    );
  }
}
