export interface Activity {
  id: number;
  title: string;
  timesOccurred: number;
  timeOfOccurence: string;
}

export interface DataPoint {
  timestamp: number;
  value: any;
}

export interface BucketCollection {
  [bucket: string]: DataPoint[];
}

export interface DashboardConfiguration {
  grid: {
    rows: number;
    cols: number;
  };
  widgets: WidgetConfiguration[];
}

export interface WidgetConfiguration {
  placement: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  type: WidgetType;
  title: string;
  bucket: string;
  typeConfiguration: NumberWidgetConfiguration | GraphWidgetConfiguration;
}

export interface NumberWidgetConfiguration {
  type: NumberType;
  filter?: (dataPoint: DataPoint) => boolean;
}

export interface GraphWidgetConfiguration {
  xAxis: AxisType;
  xAxisConfiguration?: {property: string};
  yAxis: AxisType;
  yAxisConfiguration?: {property: string};
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

export enum WidgetType {
  number,
  graph,
}
