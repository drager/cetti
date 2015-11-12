import * as Redux from 'redux';
import activityReducer from './reducers/activity';

const reducers = Redux.combineReducers({
    activities: activityReducer
});

const store = Redux.createStore(reducers);

export default store;
