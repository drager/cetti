import { Activity } from '../entites';
import { ADD_ACTIVITY } from '../action-types';
import initialState from '../initial-state';

const activities = () => <Activity[]>({
  [ADD_ACTIVITY]: (state: Activity[], action): Activity[] => {
    return [
      ...state,
      {
        id: action.payload.id,
        title: action.payload.title,
        timesOccurred: action.payload.timesOccurred,
        timeOfOccurence: action.payload.timeOfOccurence,
      },
    ];
  },
}, initialState);

export default activities;
