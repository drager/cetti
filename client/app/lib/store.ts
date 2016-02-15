import nedb from 'nedb-persist';
import { applyMiddleware, Store as ReduxStore, compose, createStore } from 'redux';
import { reactStore } from 'redux-decorated/react';
import { persistStore, autoRehydrate } from 'redux-persist';
import { websocketMiddleware } from 'redux-websocket/lib/client';
import { syncStoreEnhancer } from 'redux-websocket/lib/sync';

import { actions } from 'common/lib/actions';
import { BucketState, DashboardState } from 'common/lib/state-types';

import { webSocketClient } from './websocket';

export type State = {
  buckets: BucketState,
  dashboards: DashboardState,
};

const initialState = {
  buckets: {},
  dashboards: {},
  versions: {},
};

export interface Store extends ReduxStore {
  getState(): State;
}

export const store = createStore(
  state => state || initialState,
  compose(
    autoRehydrate(),
    syncStoreEnhancer({
      connection: webSocketClient,
      keys: ['buckets', 'dashboards'],
    }),
    applyMiddleware(websocketMiddleware({client: webSocketClient, actions}))
  )
) as Store;

export const stateful = reactStore<State>(store).stateful;
export const dispatch = reactStore<State>(store).dispatch;

persistStore(store);
