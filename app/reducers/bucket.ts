import { BucketCollection } from '../entites';
import initialState from '../initial-state';

const buckets = () => <BucketCollection>({}, initialState.buckets);

export default buckets;
