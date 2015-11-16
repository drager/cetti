import { Activity } from '../entites';

import * as types from '../action-types';

export const addActivity = (activity: Activity) => {
  return {
    type: types.ADD_ACTIVITY,
    activity,
  };
};

export const markAsResolved = (activity: Activity) => {
  return {
    type: types.MARK_ACTIVITY_AS_RESOLVED,
    activity: activity,
  };
};
