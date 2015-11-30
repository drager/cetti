import * as Redux from 'redux';

import dashboardsReducer from './reducers/dashboard';
import bucketReducer from './reducers/bucket';

const reducers = Redux.combineReducers({
  dashboards: dashboardsReducer,
  buckets: bucketReducer,
});

const store = Redux.createStore(reducers);

export default store;
