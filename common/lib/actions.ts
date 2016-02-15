import { Action, createActions } from 'redux-decorated';

export const actions = createActions({
  addData: {} as Action<{data: any[]}>,
  markAsResolved: {
    meta: {
      toServer: true,
    },
  } as Action<{bucket: string, id: string}>,
});
console.log('actions', actions);
