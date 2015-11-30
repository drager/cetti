import * as React from 'react';

import { stateful } from '../redux/helpers';
import {
  BucketCollection,
  AxisConfiguration,
  AxisType,
  ChartType,
  ChartWidgetConfiguration,
  WidgetConfiguration,
} from '../entites';

import { catmullRomSpline } from '../lib/catmull-rom-spline';
import { Widget } from './widget';

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration,
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

@stateful(state => ({buckets: state.buckets}))
export class ChartWidget extends React.Component<Properties, State> {

  getConfiguration() {
    return this.props.configuration.typeConfiguration as ChartWidgetConfiguration;
  }

  constructor(props) {
    super(props);

    this.state = {width: 0, height: 0};
  }

  componentDidMount() {
    this.setState({
      width: (this.refs as any).svg.offsetWidth,
      height: (this.refs as any).svg.offsetHeight,
    });
  }

  getData(): Data {
    const configuration = this.props.configuration.typeConfiguration as ChartWidgetConfiguration;
    let dataPoints = this.state.buckets[this.props.configuration.bucket];

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
        <h3>{configuration.title}</h3>
        <span>{}</span>
        <svg width='100%' height='100%' ref='svg'>
          {this.renderChart()}
        </svg>
      </Widget>
    );
  }

  private renderChart() {
    const data = this.getData();

    if (!this.state.width || !this.state.height) {
      return;
    }

    return <g>
      {this.renderAxis(data.y)}
      {this.renderDiagram(data)}
    </g>;
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

    return <g>
      {labels.map((label, index) =>
          <text x={label.x} y={label.y} textAnchor='end' key={index}>{label.text}</text>)}
    </g>;
  }

  private renderDiagram(data: Data): JSX.Element | JSX.Element[] {
    const diagramHeight = (this.state.height - padding * 2);
    const diagramWidth = (this.state.width - padding * 2 - axisWidth);
    let xScale = diagramWidth / data.x.length;
    const yScale = diagramHeight / data.y.length;

    switch (data.type) {
      case ChartType.bar:

        return data.points.map((point, index) => {
          const width = 0.5 * xScale;
          xScale = (diagramWidth - width) / data.x.length;
          const height = (point.y - data.y.min) * yScale;

          return <rect x={point.x * xScale + axisWidth} y={diagramHeight + padding - height}
                       width={width} height={height} key={index} />;
        });

      case ChartType.line:
        const yMin = data.y.min;
        const stop = (x, y) => `${(x - data.x.min) * xScale + axisWidth}, ` +
                               `${diagramHeight + padding - (Math.max(y, yMin) - yMin) * yScale}`;

        let points = data.points;
        if (this.getConfiguration().smooth) {
          points = catmullRomSpline(points, 20);
        }
        let line;
        if (this.getConfiguration().fill) {
          line = `M ${stop(data.x.min, data.y.min)} L ${stop(points[0].x, points[0].y)}`;
        } else {
          line = `M ${stop(points[0].x, points[0].y)} L`;
        }

        points.slice(1).forEach(({x, y}, index) => (line += ` ${stop(x, y)}`));

        if (this.getConfiguration().fill) {
          line += ` L ${stop(points[points.length - 1].x, data.y.min)}`;
        }

        return <path d={line} strokeWidth={3} stroke='black'
                     fill={this.getConfiguration().fill ? 'green' : 'none'} />;

      default: throw new Error('Invalid chart type');
    }
  }
}
