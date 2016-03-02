import { Action as DecoratedAction, createActions } from 'redux-decorated';
import { Action as WebSocketAction } from 'redux-websocket/lib/common';

type Action<T> = DecoratedAction<T> & WebSocketAction

export const actions = createActions({
  addData: {} as Action<{data: any[]}>,
  markAsResolved: {
    meta: {
      toServer: true,
    },
  } as Action<{bucket: string, id: string}>,
});
