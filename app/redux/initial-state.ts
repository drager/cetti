import {
  AxisType,
  BucketCollection,
  ChartType,
  DashboardsConfiguration,
  NumberType,
  WidgetType,
} from '../entites';

const initialState = {
  dashboards: {
    dashboard: {
      name: 'Dashboard',
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
          title: 'Last',
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
          title: 'Count',
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
          title: 'Sum',
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
        {
          placement: {
            x: 0,
            y: 3,
            width: 3,
            height: 2,
          },
          type: WidgetType.errorList,
          title: 'Errors',
          bucket: 'error',
        },
      ],
    },
    errors: {
      name: 'Errors',
      grid: {
        cols: 1,
        rows: 1,
      },
      widgets: [
        {
          placement: {
            x: 0,
            y: 0,
            width: 1,
            height: 1,
          },
          type: WidgetType.errorList,
          title: 'Errors',
          bucket: 'error',
        },
      ],
    },
  } as DashboardsConfiguration,
  buckets: {
    last: [
      {
        timestamp: Date.now(),
        value: 2,
      },
      {
        timestamp: Date.now(),
        value: 5,
      },
    ],
    count: [
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
    sum: [
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
    chart: [
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
    error: [
      {
        id: '1',
        timestamp: Date.parse('2015-11-10T09:39:42Z'),
        value: {
          message: `Module build failed: SyntaxError:
          /app/components/activity-detail.tsx: missing super() call in constructor`,
          fileName: '/app/components/activity-detail.tsx',
          lineNumber: 32,
          columnNumber: 16,
          resolved: false,
          stacktrace: [{
            functionName: 'constructor()',
            args: '',
            fileName: '/app/components/activity-detail.tsx',
            lineNumber: 32,
            columnNumber: 16,
          }],
        },
      },
      {
        id: '2',
        timestamp: Date.parse('2015-11-10T10:59:42Z'),
        value: {
          message: `./app/components/card-list.tsx(54,43): error TS1005: ':' expected.`,
          resolved: false,
          catched: true,
          stacktrace: [],
        },
      },
    ],
  } as BucketCollection,
};

export default initialState;
