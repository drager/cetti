import {Store as ReduxStore, combineReducers, createStore} from 'redux';
import {buckets, BucketState} from './reducers/bucket';
import {dashboards, DashboardState} from './reducers/dashboard';

export type State = {
  buckets: BucketState,
  dashboards: DashboardState,
};

export interface Store extends ReduxStore {
  getState(): State;
}

export const store = createStore(combineReducers({buckets, dashboards})) as Store;
