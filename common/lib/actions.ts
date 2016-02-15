import { Action as DecoratedAction, createActions } from 'redux-decorated';

interface Action<T> extends DecoratedAction<T> {
  meta?: {
    toClient?: boolean,
    toServer?: boolean,
  },
};

export const actions = createActions({
  addData: {} as Action<{data: any[]}>,
  markAsResolved: {
    meta: {
      toServer: true,
    },
  } as Action<{bucket: string, id: string}>,
});
