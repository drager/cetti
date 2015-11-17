import { AxisType, BucketCollection, ChartType, NumberType, WidgetType } from './entites';

const initialState = {
  activities: [
    {
      id: 1,
      title: `./app/components/card-list.tsx
              (9,3): error TS2377: Constructors for derived classes must contain a 'super' call.`,
      timesOccurred: 5,
      timeOfOccurence: '2015-11-10 09:39:42',
      resolved: false,
    },
    {
      id: 2,
      title: `./app/components/card-list.tsx(54,43): error TS1005: ':' expected.`,
      timesOccurred: 1,
      timeOfOccurence: '2015-11-10 10:59:22',
      resolved: false,
    },
  ],
  dashboard: {
    grid: {
      cols: 4,
      rows: 5,
    },
    widgets: [
      {
        placement: {
          x: 0,
          y: 0,
          width: 1,
          height: 1,
        },
        type: WidgetType.number,
        title: 'last',
        bucket: 'last',
        typeConfiguration: {
          type: NumberType.last,
        },
      },
      {
        placement: {
          x: 1,
          y: 0,
          width: 1,
          height: 1,
        },
        type: WidgetType.number,
        title: 'count',
        bucket: 'count',
        typeConfiguration: {
          type: NumberType.count,
          filter: (data) => data.value === 5,
        },
      },
      {
        placement: {
          x: 2,
          y: 0,
          width: 1,
          height: 1,
        },
        type: WidgetType.number,
        title: 'sum',
        bucket: 'sum',
        typeConfiguration: {
          type: NumberType.sum,
          filter: (data) => data.value < 5,
        },
      },
      {
        placement: {
          x: 0,
          y: 1,
          width: 2,
          height: 2,
        },
        type: WidgetType.chart,
        title: 'Bar Chart',
        bucket: 'chart',
        typeConfiguration: {
          chartType: ChartType.bar,
          xAxis: {type: AxisType.occurence},
          yAxis: {type: AxisType.value},
        },
      },
      {
        placement: {
          x: 2,
          y: 1,
          width: 2,
          height: 2,
        },
        type: WidgetType.chart,
        title: 'Line Chart',
        bucket: 'chart',
        typeConfiguration: {
          chartType: ChartType.line,
          fill: true,
          smooth: true,
          xAxis: {type: AxisType.occurence},
          yAxis: {type: AxisType.value},
        },
      },
    ],
  },
  buckets: {
    'last': [
      {
        timestamp: Date.now(),
        value: 2,
      },
      {
        timestamp: Date.now(),
        value: 5,
      },
    ],
    'count': [
      {
        timestamp: Date.now(),
        value: 2,
      },
      {
        timestamp: Date.now(),
        value: 5,
      },
      {
        timestamp: Date.now(),
        value: 5,
      },
    ],
    'sum': [
      {
        timestamp: Date.now(),
        value: 2,
      },
      {
        timestamp: Date.now(),
        value: 4,
      },
      {
        timestamp: Date.now(),
        value: 5,
      },
    ],
    'chart': [
      {
        timestamp: Date.now(),
        value: 3,
      },
      {
        timestamp: Date.now(),
        value: 1,
      },
      {
        timestamp: Date.now(),
        value: 4,
      },
      {
        timestamp: Date.now(),
        value: 5,
      },
      {
        timestamp: Date.now(),
        value: 4,
      },
      {
        timestamp: Date.now(),
        value: 2,
      },
      {
        timestamp: Date.now(),
        value: 1,
      },
      {
        timestamp: Date.now(),
        value: 1,
      },
      {
        timestamp: Date.now(),
        value: 2,
      },
      {
        timestamp: Date.now(),
        value: 1,
      },
      {
        timestamp: Date.now(),
        value: 5,
      },
    ],
  } as BucketCollection,
};

export default initialState;
