import { DashboardsConfiguration } from '../entites';
import initialState from '../initial-state';

const dashboards = () => <DashboardsConfiguration>({}, initialState.dashboards);

export default dashboards;
