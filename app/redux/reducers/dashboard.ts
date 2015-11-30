import { DashboardsConfiguration } from '../../lib/entites';
import { createReducer } from '../helpers';
import initialState from '../initial-state';

export type DashboardState = DashboardsConfiguration;

export const dashboards = createReducer(initialState.dashboards)
  .build();
