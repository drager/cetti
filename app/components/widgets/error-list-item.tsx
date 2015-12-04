import * as React from 'react';
import { Card, IconButton } from 'react-mdl';

import { actions } from '../../redux/actions';
import { dispatch } from '../../redux/helpers';
import { DataPoint, ErrorMessage } from '../../lib/entites';
import { formatDate, isoDate } from '../../lib/helpers';

const styles = require('./error-list-item.scss');

type Properties = {
  item: DataPoint<ErrorMessage>,
  bucket: string;
}

export class ErrorListItem extends React.Component<Properties, {}> {

  render() {
    const { item } = this.props;
    const occerences = 2;

    return (
      <Card key={item.id}>
        <div className={styles.count}>
          {occerences}
        </div>
        <div className={styles.text}>
          <h6 className={styles.header}>{item.value.message}</h6>
          <time className={styles.date} dateTime={isoDate(item.timestamp)}>
            {formatDate(item.timestamp)}
          </time>
          {!item.value.catched && (
            <span className={styles.warning}> - <span>Uncaught Exception</span></span>)}
        </div>
        <IconButton name='done'
                    onClick={(e) => {
                      e.preventDefault();
                      this.markAsResolved(item);
                    }}
                    className={styles.done} />
      </Card>
    );
  }

  private markAsResolved(errorMessage: DataPoint<ErrorMessage>) {
    dispatch(actions.markAsResolved, {
      id: errorMessage.id,
      bucket: this.props.bucket,
    });
  }
}
