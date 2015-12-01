import * as React from 'react';
import * as Colors from 'material-ui/lib/styles/colors';
import * as Typography from 'material-ui/lib/styles/typography';
import { Card, IconButton } from 'react-mdl';

import { DataPoint, ErrorMessage } from '../lib/entites';

const styles = Object.freeze({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',

    padding: 8,
    width: '100%',
    minHeight: 0,
  },
  count: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    width: 64,
    height: 64,

    color: Colors.fullWhite,
    backgroundColor: Colors.red500,
    borderRadius: '50%',
    fontSize: 24,
    fontWeight: Typography.fontWeightLight,
    flexShrink: 0,
  },
  doneIcon: {
    fontSize: 32,
    display: 'flex',
    color: Colors.green500,
  },
  header: {
    margin: 0,
    marginBottom: 4,

    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  date: {
    color: Typography.textLightBlack,
  },
  text: {
    flex: 1,
    overflow: 'hidden',
  },
  done: {
    width: 48,
    height: 48,
  },
  warning: {
    color: Colors.red500,
  },
});

type Properties = {
  error: DataPoint<ErrorMessage>,
  occerences: number,
  markAsResolved: (error: DataPoint<ErrorMessage>) => void,
}

export class ErrorListItem extends React.Component<Properties, {}> {

  render() {
    const { error, markAsResolved, occerences } = this.props;

    return (
      <Card key={error.id} style={styles.container}>
        <div style={styles.count}>
          {occerences}
        </div>
        <div style={styles.text}>
          <h5 style={styles.header}>{error.value.message}</h5>
          <span style={styles.date}>{error.timestamp.toLocaleString()}</span>
          {!error.value.catched && (
            <span style={styles.warning}> - <span>Uncaught Exception</span></span>)}
        </div>
        <IconButton name='done' colored onClick={() => markAsResolved(error)} style={styles.done} />
      </Card>
    );
  }
}
