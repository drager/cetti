import { createReducer, updateIn } from 'redux-decorated';
import { BucketState } from 'cetti-common/lib/state-types';
import { actions } from 'cetti-common/lib/actions';
import initialState from '../initial-state';

export const buckets = createReducer<BucketState>(initialState.buckets as BucketState)
  .when(actions.markAsResolved, (state, {bucket, id}: any) => {
    const errorIndex = state[bucket].findIndex(dataPoint => dataPoint.id === id);
    return updateIn([bucket, errorIndex, 'value', 'resolved'], true, state);
  })
  .when(actions.addData, (state, {data}: any) => {
    for (const {bucketName, dataPoint} of data) {
      if (!state[bucketName]) {
        state = updateIn([bucketName], [dataPoint], state);
      } else {
        state = updateIn([bucketName], [...state[bucketName], dataPoint], state);
      }
    }
    return state;
  });
