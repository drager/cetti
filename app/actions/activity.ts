import { Activity } from '../entites';

import * as types from '../action-types';

export const addActivity = (activity: Activity) => {
  return {
    type: types.ADD_ACTIVITY,
    activity,
  };
};
