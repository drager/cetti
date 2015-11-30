import { ErrorMessage } from '../entites';
import { MARK_ACTIVITY_AS_RESOLVED } from '../action-types';
import initialState from '../initial-state';
import { createReducer } from '../utils';

//const activities = {
//  [MARK_ACTIVITY_AS_RESOLVED]: (state: Activity, action): Activity[] => {
//    return Object.values(state).map(activity =>
//      activity.id === action.activity.id
//          ? Object.assign({}, activity, { resolved: !activity.resolved })
//          : activity
//    );
//  },
//};

//export default createReducer(activities, initialState.activities);
