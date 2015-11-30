import { ErrorMessage } from '../entites';

import * as types from '../action-types';

export const markAsResolved = (activity: ErrorMessage) => {
  return {
    type: types.MARK_ACTIVITY_AS_RESOLVED,
    activity: activity,
  };
};
