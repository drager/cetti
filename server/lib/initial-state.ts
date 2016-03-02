import {
  AxisType,
  BucketCollection,
  ChartType,
  DashboardsConfiguration,
  NumberType,
  ListType,
  WidgetType,
} from 'cetti-common/lib/entites';

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
          title: 'Download Time',
          bucket: 'downloadTime',
          typeConfiguration: {
            type: NumberType.last,
            unit: 'ms',
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
          title: 'Render Time',
          bucket: 'renderTime',
          typeConfiguration: {
            type: NumberType.last,
            unit: 'ms',
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
          type: WidgetType.list,
          title: 'Errors',
          bucket: 'error',
          dashboard: 'errors',
          typeConfiguration: {
            type: ListType.error,
            filter: '!value.resolved',
          },
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
          type: WidgetType.list,
          title: 'Errors',
          bucket: 'error',
          typeConfiguration: {
            type: ListType.error,
            filter: '!value.resolved',
          },
        },
      ],
    },
    builds: {
      name: 'Travis Builds',
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
          type: WidgetType.list,
          title: 'Travis Builds',
          bucket: 'build',
          typeConfiguration: {
            type: ListType.generic,
            title: 'message',
            subtitle: (data) => {
              return `Build ${data.value.result === 1 ? 'failed' : 'succeeded'}
                      at ${new Date(Date.parse(data.value.finished_at))
                          .toLocaleString('sv-SE')}
                      at branch ${data.value.branch}`;
            },
          },
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
        value: 50000,
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
          stacktrace: [
            {
              functionName: 'constructor()',
              args: '',
              fileName: '/app/components/activity-detail.tsx',
              lineNumber: 32,
              columnNumber: 16,
            },
          ],
        },
      },
      {
        id: '2',
        timestamp: Date.parse('2015-11-10T10:59:42Z'),
        value: {
          message: `./app/components/card-list.tsx(54,43): error TS1005: ':' expected.`,
          fileName: '/app/components/activity-detail.tsx',
          lineNumber: 32,
          columnNumber: 16,
          resolved: false,
          catched: true,
          stacktrace: [],
        },
      },
    ],
  } as BucketCollection,
};

export default initialState;
