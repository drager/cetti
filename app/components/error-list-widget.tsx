import { ActivityItem } from './activity-item';
import * as React from 'react';
import { Link } from 'react-router';

import { actions } from '../redux/actions';
import { dispatch, stateful } from '../redux/helpers';
import {
  BucketCollection,
  DataPoint,
  ErrorMessage,
  WidgetConfiguration,
} from '../entites';

import { Widget } from './widget';

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration,
  key?: any,
  markAsResolved?: (errorMessage: DataPoint<ErrorMessage>) => void,
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
          <div key={error.id}>
            <Link to={`/stream/${error.id}`}>
              <ActivityItem errorMessage={error}
                            markAsResolved={this.markAsResolved.bind(this)}
                            />
            </Link>
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
