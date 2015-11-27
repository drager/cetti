import * as React from 'react';
import * as Colors from 'material-ui/lib/styles/colors';
import * as Typography from 'material-ui/lib/styles/typography';

import { Activity } from '../entites';
import { fontStyles, layoutStyles } from '../styles';

const styles = Object.freeze({
  container: {
    flex: 1,
  },
  header: {
    padding: 8,
    display: 'flex',
    borderBottom: '1px solid ' + Colors.grey300,
    height: 200,
  },
  heading: Object.assign({
    color: Colors.fullBlack,
    fontWeight: Typography.fontWeightLight,
    margin: 0,
    padding: 8,
  }, fontStyles.title),
  occurredLabel: Object.assign({
    display: 'flex',
    alignItems: 'center',
  }, layoutStyles.column),
  timesOccurred: {
    fontWeight: Typography.fontWeightLight,
    fontSize: 64,
  },
  stackframe: {
    fontFamily: 'Consolas, monospace',
  },
});

export default class ActivityDetail extends React.Component<{activities: Activity[]}, {}> {

  render() {
    const activity = {title: 'test', timesOccurred: 5};
    return (
      <div style={styles.container}>
        <header style={styles.header}>
          <h2 style={styles.heading}>{activity.title}</h2>
          <div style={styles.occurredLabel}>
            <span style={styles.timesOccurred}>{activity.timesOccurred}</span>
            <span>Times of occurrence</span>
          </div>
        </header>
      </div>
    );
  }
}
