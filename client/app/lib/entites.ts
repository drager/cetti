export interface Log {
  message: string;
  attachments: any[];
  level: Level;
}

export enum Level {
  debug,
  config,
  info,
  warning,
  severe,
  fatal,
}

export interface ErrorMessage {
  message: string;
  resolved: boolean;
  catched: boolean;
  lineNumber: number;
  colNumber: number;
  fileName: string;
  stacktrace: StackFrame[];
}

export interface StackFrame {
  functionName: string;
  args: any[];
  fileName: string;
  lineNumber: number;
  columnNumber: number;
}

export interface DataPoint<T> {
  id?: string;
  sessionId?: string;
  timestamp: number;
  value: T;
}

export interface PushData {
  bucketName: string;
  dataPoint: DataPoint<any>;
}

export interface BucketCollection {
  [bucket: string]: DataPoint<any>[];
}

export interface DashboardsConfiguration {
  [id: string]: DashboardConfiguration;
}

export interface DashboardConfiguration {
  name: string;
  grid: {
    rows: number;
    cols: number;
  };
  widgets: WidgetConfiguration<any>[];
}

export interface WidgetConfiguration<T> {
  placement: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  type: WidgetType;
  title: string;
  bucket: string;
  typeConfiguration?: T;
  /**
   * A link to another dashboard that should be opened when the widget is clicked
   */
  dashboard?: string;
}

export interface NumberWidgetConfiguration {
  type: NumberType;
  unit?: string;
  filter?: (dataPoint: DataPoint<any>) => boolean;
}

export interface ChartWidgetConfiguration {
  xAxis: AxisConfiguration;
  yAxis: AxisConfiguration;
  chartType: ChartType;
  /**
   * Whenever a line chart should be filled or not
   */
  fill?: boolean;
  /**
   * Whenever the curve of a line chart should be smoothed or not
   */
  smooth?: boolean;
}

type MapFunction = (dataPoint: DataPoint<any>) => string;

export interface ListWidgetConfiguration {
  type: ListType;
  filter?: (dataPoint: DataPoint<any>) => boolean;
  title: MapFunction|string;
  subtitle?: MapFunction|string;
}

export interface AxisConfiguration {
  type: AxisType;
  property?: string;
}

export enum NumberType {
  /**
   * Counts the number of datapoints
   */
  count,
  /**
   * Uses the value of the last datapoint
   */
  last,
  /**
   * Sum the values of all datapoints
   */
  sum,
}

export enum AxisType {
  /**
   * Use the timestamp of the datapoint
   */
  timestamp,
  /**
   * Use the value of the datapoint
   * Requires the value of the datapoint to be a number
   */
  value,
  /**
   * Use a property in the value of datapoint
   * Requires the value of the datapoint to be an object and the property to be a number
   */
  property,
  /**
   * Every datapoint is equally worth and is spread linarly over the axis
   */
  occurence,
}

export enum ChartType {
  bar,
  line,
}

export enum ListType {
  generic,
  error,
}

export enum WidgetType {
  chart,
  errorList,
  list,
  number,
}
