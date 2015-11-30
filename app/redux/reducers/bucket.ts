import { BucketCollection } from '../../lib/entites';
import { updateIn } from '../../lib/helpers';
import { actions } from '../actions';
import { createReducer } from '../helpers';
import initialState from '../initial-state';

export type BucketState = BucketCollection;

export const buckets = createReducer<BucketState>(initialState.buckets)
  .when(actions.markAsResolved, (state, {bucket, id}) => {
    const errorIndex = state[bucket].findIndex(dataPoint => dataPoint.id === id);

    return updateIn([bucket, errorIndex, 'value', 'resolved'], true, state);
  })
  .build();
