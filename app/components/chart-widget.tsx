import * as React from 'react';
import { connect } from 'react-redux';

import {
  BucketCollection,
  AxisConfiguration,
  AxisType,
  ChartType,
  ChartWidgetConfiguration,
  WidgetConfiguration,
} from '../entites';

import { Widget } from './widget';

type Properties = {
  grid: {cols: number, rows: number},
  configuration: WidgetConfiguration,
  buckets?: BucketCollection,
  key?: any,
};

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
  data: {x: number[], y: number[]},
};

const padding = 10;
const axisWidth = 50;

export class ChartWidget extends React.Component<Properties, {width: number, height: number}> {

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
    let dataPoints = this.props.buckets[this.props.configuration.bucket];

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

    return {
      type: configuration.chartType,
      x: maxMin(x),
      y: maxMin(y),
      data: {x, y},
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

  private renderAxis({max, min}: MinMax) {
    const labels = [
      {
        x: padding + axisWidth / 2,
        y: padding,
        text: max,
      },
      {
        x: padding + axisWidth / 2,
        y: this.state.height - padding,
        text: min,
      },
    ];

    const labelCount = Math.round(this.state.height / 50) - 1;
    const positionStep = this.state.height / labelCount;
    const valueStep = (max + min) / labelCount;

    for (let i = 1; i < labelCount; i++) {
      labels.push({
        x: padding + axisWidth / 2,
        y: this.state.height - positionStep * i,
        text: Math.round(valueStep * i * 10) / 10,
      });
    }

    return <g>
      {labels.map((label, index) =>
          <text x={label.x} y={label.y} textAnchor='end' key={index}>{label.text}</text>)}
    </g>;
  }

  private renderDiagram(data: Data): JSX.Element | JSX.Element[] {
    const {x, y} = data.data;
    const diagramHeight = (this.state.height - padding * 2);
    const diagramWidth = (this.state.width - padding * 2 - axisWidth);
    let xScale = diagramWidth / data.x.length;
    const yScale = diagramHeight / data.y.length;

    switch (data.type) {
      case ChartType.bar:
        const points = x.map((x, index) => ({x, y: y[index]}));

        return points.map((point, index) => {
          const width = 0.5 * xScale;
          xScale = (diagramWidth - width) / data.x.length;
          const height = (point.y - data.y.min) * yScale;

          return <rect x={point.x * xScale + axisWidth} y={diagramHeight + padding - height}
                       width={width} height={height} key={index} />;
        });

      case ChartType.line:
        const stop = (x, y) => `${(x - data.x.min) * xScale + axisWidth} ` +
                               `${diagramHeight + padding - (y - data.y.min) * yScale}`;

        let line;

        if (this.getConfiguration().fill) {
          line = `M ${stop(data.x.min, data.y.min)} L ${stop(x[0], y[0])}`;
        } else {
          line = `M ${stop(x[0], y[0])}`;
        }

        x.slice(1).forEach((x, index) => (line += ` L ${stop(x, y[index + 1])}`));

        if (this.getConfiguration().fill) {
          line += ` L ${stop(x[x.length - 1], data.y.min)}`;
        }

        return <path d={line} strokeWidth={3} stroke='black'
                     fill={this.getConfiguration().fill ? 'green' : 'none'} />;

      default: throw new Error('Invalid chart type');
    }
  }
}

const mapStateToProps = state => {
  return {
    buckets: state.buckets,
  };
};

export default connect(mapStateToProps)(ChartWidget);
