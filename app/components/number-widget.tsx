import * as Colors from 'material-ui/lib/styles/colors';
import * as Typography from 'material-ui/lib/styles/typography';
import * as React from 'react';

import {
  BucketCollection,
  NumberType,
  NumberWidgetConfiguration,
  WidgetConfiguration,
} from '../lib/entites';
import { stateful } from '../redux/helpers';

import { Widget } from './widget';

const styles = Object.freeze({
  container: {
    display: 'flex',
    alignItems: 'flex-end',

    position: 'absolute',
    right: 8,
    bottom: 0,
  },
  number: {
    position: 'relative',
    right: 16,
    bottom: -4,
    margin: 0,

    color: Colors.teal500,

    fontSize: 72,
  },
  unit: {
    margin: 0,
    marginLeft: -8,
    marginBottom: 12,

    color: Typography.textLightBlack,
  },
});

type Properties = {
  configuration: WidgetConfiguration,
  grid: {cols: number, rows: number},
  key?: any,
}

type State = {
  buckets?: BucketCollection,
};

@stateful(state => ({buckets: state.buckets}))
export class NumberWidget extends React.Component<Properties, State> {

  getData() {
    const configuration = this.props.configuration.typeConfiguration as NumberWidgetConfiguration;
    let dataPoints = this.state.buckets[this.props.configuration.bucket] || [];

    if (configuration.filter) {
      dataPoints = dataPoints.filter(configuration.filter);
    }

    switch (configuration.type) {
      case NumberType.count: return dataPoints.length;
      case NumberType.last: return (dataPoints[dataPoints.length - 1] || {} as any).value;
      case NumberType.sum: return dataPoints.reduce((sum, data) => sum + data.value, 0);
    }

    throw new Error('Invalid number type!');
  }

  render() {
    const { configuration, grid } = this.props;
    const { unit } = configuration.typeConfiguration as NumberWidgetConfiguration;

    return (
      <Widget grid={grid} configuration={configuration}>
        <div style={styles.container}>
          <h1 style={styles.number}>{this.getData()}</h1>
          {unit && <h2 style={styles.unit}>{unit}</h2>}
        </div>
      </Widget>
    );
  }
}
