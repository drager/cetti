import * as React from 'react';

import {
  BucketCollection,
  DataPoint,
  ErrorMessage,
  WidgetConfiguration,
} from '../lib/entites';
import { actions } from '../redux/actions';
import { dispatch, stateful } from '../redux/helpers';

import { ErrorListItem } from './error-list-item';
import { Widget } from './widget';

const styles = Object.freeze({
  container: {
    paddingTop: 8,
    paddingLeft: 8,
  },
});

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration,
  key?: any,
};

type State = {
  buckets?: BucketCollection,
};

type Data = ErrorMessage[];

@stateful(state => ({buckets: state.buckets}))
export class ErrorListWidget extends React.Component<Properties, State> {

  getErrors(): DataPoint<ErrorMessage>[] {
    let dataPoints = this.state.buckets[this.props.configuration.bucket];

    return dataPoints.filter(data => !data.value.resolved);
  }

  render() {
    const { configuration, grid } = this.props;

    return (
      <Widget grid={grid} configuration={configuration}>
        {this.getErrors().map((error) =>
          <div key={error.id} style={styles.container}>
            <ErrorListItem error={error} occerences={2}
                           markAsResolved={this.markAsResolved.bind(this)} />
          </div>
        )}
      </Widget>
    );
  }

  private markAsResolved(errorMessage: DataPoint<ErrorMessage>) {
    dispatch(actions.markAsResolved, {
      id: errorMessage.id,
      bucket: this.props.configuration.bucket,
    });
  }
}
