import { DashboardState } from 'cetti-common/lib/state-types';
import { createReducer } from 'redux-decorated';
import initialState from '../initial-state';

export const dashboards = createReducer<DashboardState>(initialState.dashboards);
