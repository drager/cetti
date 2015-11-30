import * as Redux from 'redux';

//import activityReducer from './reducers/activities';
import dashboardsReducer from './reducers/dashboard';
import bucketReducer from './reducers/bucket';

const reducers = Redux.combineReducers({
//  activities: activityReducer,
  dashboards: dashboardsReducer,
  buckets: bucketReducer,
});

const store = Redux.createStore(reducers);

export default store;
