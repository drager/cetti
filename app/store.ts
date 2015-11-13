import * as Redux from 'redux';

import activityReducer from './reducers/activity';
import dashboardReducer from './reducers/dashboard';
import bucketReducer from './reducers/bucket';

const reducers = Redux.combineReducers({
  activities: activityReducer,
  dashboard: dashboardReducer,
  buckets: bucketReducer,
});

const store = Redux.createStore(reducers);

export default store;
