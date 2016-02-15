import * as React from 'react';

import {
  BucketCollection,
  AxisConfiguration,
  AxisType,
  ChartType,
  ChartWidgetConfiguration,
  WidgetConfiguration,
} from 'common/lib/entites';

import { catmullRomSpline } from '../../lib/catmull-rom-spline';
import { stateful } from '../../lib/store';
import { Widget } from './widget';

const styles = require('./chart-widget.scss');

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration<ChartWidgetConfiguration>,
  key?: any,
};

type State = {
  buckets?: BucketCollection,
  width: number,
  height: number
}

type MinMax = {
  min: number,
  max: number,
  length: number,
  span: number;
};

type Data = {
  type: ChartType,
  x: MinMax,
  y: MinMax,
  points: {x: number, y: number}[],
};

const padding = 10;
const axisWidth = 50;

@stateful(state => {
  console.log('stateful', state);
  return ({buckets: state.buckets});
})
export class ChartWidget extends React.Component<Properties, State> {

  getDiagramSize() {
    console.log(this.state);
    const width = this.state.width - padding * 2 - axisWidth;
    const height = this.state.height - padding * 2;

    return {height, width};
  }

  getConfiguration() {
    return this.props.configuration.typeConfiguration;
  }

  constructor(props) {
    super(props);

    this.state = {width: 0, height: 0, buckets: {}};
    // Binding this becouse the method will be used as a callback
    this.measureSize = this.measureSize.bind(this);
  }

  componentDidMount() {
    this.measureSize(() => {
      if (!this.state.width || !this.state.height) {
        setTimeout(this.measureSize, 1);
      }
    });
    window.addEventListener('resize', this.measureSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.measureSize);
  }

  getData(): Data {
    const configuration = this.props.configuration.typeConfiguration;
    let dataPoints = this.state.buckets[this.props.configuration.bucket] || [];

    const fixAxis = (axis: AxisConfiguration) => {
      switch (axis.type) {
        case AxisType.timestamp:
          return dataPoints.map(dp => dp.timestamp);
        case AxisType.value:
          return dataPoints.map(dp => dp.value);
        case AxisType.property:
          return dataPoints.map(dp => dp.value[axis.property]);
        case AxisType.occurence:
          return dataPoints.map((_, index) => index);
        default:
          throw new Error('invalid axis type' + axis.type);
      }
    };

    const maxMin = (data: number[]) => {
      let min = data[0];
      let max = min;

      data.forEach(dp => {
        min = Math.min(min, dp);
        max = Math.max(max, dp);
      });

      return {min, max, length: max - min, span: max + min};
    };

    const x = fixAxis(configuration.xAxis);
    const y = fixAxis(configuration.yAxis);
    const points = x.map((x, index) => ({x, y: y[index]}));

    return {
      type: configuration.chartType,
      x: maxMin(x),
      y: maxMin(y),
      points,
    };
  }

  render() {
    const { configuration, grid } = this.props;

    return (
      <Widget grid={grid} configuration={configuration}>
        <svg width='100%' height='100%' ref='svg'>
          {this.renderChart()}
        </svg>
      </Widget>
    );
  }

  private measureSize(callback?) {
    if (this.refs['svg']) {
      const rect = this.refs['svg']['getBoundingClientRect']();
      this.setState({
        width: rect.width,
        height: rect.height,
      }, typeof callback === 'function' ? callback : undefined);
    } else if (typeof callback === 'function') {
      setTimeout(callback, 1);
    }
  }

  private renderChart() {
    const data = this.getData();

    if (!this.state.width || !this.state.height) {
      return;
    }

    return (
      <g>
        {this.renderAxis(data.y)}
        {this.renderDiagram(data)}
      </g>
    );
  }

  private renderAxis({min, length}: MinMax) {
    const labels = [];

    const diagramHeight = (this.state.height - padding * 2);
    const labelCount = Math.round(Math.log10(diagramHeight) * 1.5);
    const positionStep = diagramHeight / (labelCount - 1);

    for (let i = 0; i < labelCount; i++) {
      const position = ((diagramHeight - (positionStep * (i))));
      const percentageOfSpan = (diagramHeight - position) / diagramHeight;

      labels.push({
        x: padding + axisWidth / 2,
        y: position + padding,
        text: Math.round((min + length * percentageOfSpan) * 10) / 10,
      });
    }

    return (
      <g>
        {labels.map((label, index) =>
            <text x={label.x} y={label.y} textAnchor='end' key={index}
                  className={styles.label}>{label.text}</text>)}
      </g>
    );
  }

  private renderDiagram(data: Data): JSX.Element | JSX.Element[] {
    switch (data.type) {
      case ChartType.bar:  return this.renderBarDiagram(data);
      case ChartType.line: return this.renderLineDiagram(data);
      default: throw new Error('Invalid chart type');
    }
  }

  private renderBarDiagram(data: Data) {
    const {width, height} = this.getDiagramSize();
    const barWidth = 0.5 * width / data.x.length;
    const xScale = (width - barWidth) / data.x.length;
    const yScale = height / data.y.length;

    return data.points.map((point, index) => {
      const barHeight = (point.y - data.y.min) * yScale;

      return <rect x={point.x * xScale + axisWidth} y={height + padding - barHeight}
                   width={barWidth} height={barHeight} key={index} className={styles.area} />;
    });
  }

  private renderLineDiagram(data: Data) {
    const {fill, smooth} = this.getConfiguration();
    const {width, height} = this.getDiagramSize();
    const yMin = data.y.min;
    const xScale = width / data.x.length;
    const yScale = height / data.y.length;
    const stop = (x, y) => `${(x - data.x.min) * xScale + axisWidth}, ` +
                           `${height + padding - (Math.max(y, yMin) - yMin) * yScale}`;

    let points = data.points;
    if (points.length === 0) {
      return null;
    }
    if (smooth) {
      points = catmullRomSpline(points, 20);
    }
    let line;
    if (fill) {
      line = `M ${stop(data.x.min, data.y.min)} L ${stop(points[0].x, points[0].y)}`;
    } else {
      line = `M ${stop(points[0].x, points[0].y)} L`;
    }

    points.slice(1).forEach(({x, y}, index) => (line += ` ${stop(x, y)}`));

    if (fill) {
      line += ` L ${stop(points[points.length - 1].x, data.y.min)}`;
    }

    return <path d={line} className={fill ? styles.area : styles.stroke} />;
  }
}
