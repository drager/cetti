import { ActivityItem } from './activity-item';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
  BucketCollection,
  DataPoint,
  ErrorMessage,
  WidgetConfiguration
} from '../entites';

import * as Actions from '../actions/activity';
import { Widget } from './widget';

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration,
  buckets?: BucketCollection,
  key?: any,
  markAsResolved?: (errorMessage: DataPoint<ErrorMessage>) => void,
};

type Data = ErrorMessage[];

export class ErrorListWidget extends React.Component<Properties, {}> {

  getErrors(): DataPoint<ErrorMessage>[] {
    let dataPoints = this.props.buckets[this.props.configuration.bucket];

    return dataPoints.filter(data => !data.value.resolved);
  }

  render() {
    const { configuration, grid } = this.props;
    return (
      <Widget grid={grid} configuration={configuration}>
        {this.getErrors().map((error) =>
          <div key={error.id}>
            <Link to={`/stream/${error.id}`}>
              <ActivityItem activity={error}
                            markAsResolved={this.props.markAsResolved}
                            />
            </Link>
          </div>
        )}
      </Widget>
    );
  }
}

const mapStateToProps = state => {
  return {
    buckets: state.buckets,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    markAsResolved: (activity) => {
      dispatch(Actions.markAsResolved(activity));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorListWidget);
