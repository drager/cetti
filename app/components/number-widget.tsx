import * as React from 'react';
import { connect } from 'react-redux';

import {
  BucketCollection,
  NumberType,
  NumberWidgetConfiguration,
  WidgetConfiguration
} from '../entites';

import { Widget } from './widget';

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration,
  buckets?: BucketCollection,
  key?: any,
};

export class NumberWidget extends React.Component<Properties, {}> {

  getData() {
    const configuration = this.props.configuration.typeConfiguration as NumberWidgetConfiguration;
    let dataPoints = this.props.buckets[this.props.configuration.bucket];

    if (configuration.filter) {
        dataPoints = dataPoints.filter(configuration.filter);
    }

    switch (configuration.type) {
      case NumberType.count: return dataPoints.length;
      case NumberType.last: return dataPoints[dataPoints.length - 1].value;
      case NumberType.sum: return dataPoints.reduce((sum, data) => sum + data.value, 0);
    }

    throw new Error('Invalid number type!');
  }

  render() {
    const { configuration, grid } = this.props;

    return (
      <Widget grid={grid} configuration={configuration}>
        <h3>{configuration.title}</h3>
        <span>{this.getData()}</span>
      </Widget>
    );
  }
}

const mapStateToProps = state => {
  return {
    buckets: state.buckets
  };
};

export default connect(mapStateToProps)(NumberWidget);
