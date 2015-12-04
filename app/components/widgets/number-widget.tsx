import * as React from 'react';

import {
  BucketCollection,
  NumberType,
  NumberWidgetConfiguration,
  WidgetConfiguration,
} from '../../lib/entites';
import { classNames } from '../../lib/helpers';
import { stateful } from '../../redux/helpers';

import { Widget } from './widget';

const styles = require('./number-widget.scss');

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
    const number = this.getData();
    const useSmallFont = number >= (unit ? 1000 : 10000);

    return (
      <Widget grid={grid} configuration={configuration}>
        <div className={styles.container}>
          <h1 className={classNames(styles.number, useSmallFont && styles.small)}>{number}</h1>
          {unit && <h2 className={styles.unit}>{unit}</h2>}
        </div>
      </Widget>
    );
  }
}
