import * as React from 'react';
import { connect } from 'react-redux';

import { Activity } from '../entites';

import { NavBar } from './nav-bar';
import { Stream } from './stream';

const styles = Object.freeze({
  main: {
    flex: 1,
    fontFamily: 'Roboto',
  },
});

export class Main extends React.Component<{activities: Activity[]}, any> {

  render() {
    return (
      <div>
        <NavBar />
        <main style={styles.main}>
          <Stream activities={this.props.activities} />
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activities: state.activities
  };
};

export default connect(mapStateToProps)(Main);
