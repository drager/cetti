declare module 'cetti-common' {
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
}
