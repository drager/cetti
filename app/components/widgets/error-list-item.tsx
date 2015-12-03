import * as React from 'react';
import { Card, IconButton } from 'react-mdl';

import { DataPoint, ErrorMessage } from '../../lib/entites';
import { formatDate, isoDate } from '../../lib/helpers';

const styles = require('./error-list-item.scss');

type Properties = {
  error: DataPoint<ErrorMessage>,
  occerences: number,
  markAsResolved: (error: DataPoint<ErrorMessage>) => void,
}

export class ErrorListItem extends React.Component<Properties, {}> {

  render() {
    const { error, markAsResolved, occerences } = this.props;

    return (
      <Card key={error.id}>
        <div className={styles.count}>
          {occerences}
        </div>
        <div className={styles.text}>
          <h6 className={styles.header}>{error.value.message}</h6>
          <time className={styles.date} dateTime={isoDate(error.timestamp)}>
            {formatDate(error.timestamp)}
          </time>
          {!error.value.catched && (
            <span className={styles.warning}> - <span>Uncaught Exception</span></span>)}
        </div>
        <IconButton name='done' onClick={() => markAsResolved(error)} className={styles.done} />
      </Card>
    );
  }
}
