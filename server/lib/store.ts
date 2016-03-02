import nedb from 'nedb-persist';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { syncStoreEnhancer } from 'redux-websocket/lib/sync';
import { websocketMiddleware } from 'redux-websocket/lib/server';

import { actions } from 'cetti-common/lib/actions';
import { buckets } from './reducers/buckets';
import { dashboards } from './reducers/dashboard';
import { webSocketServer } from './websocket';

export const storeCreator = () => {
  const reducer = combineReducers({
    buckets,
    dashboards,
    versions: (state, action) => state || {},
  });

  const store = createStore(
    reducer,
    compose(
      autoRehydrate(),
      applyMiddleware(websocketMiddleware({socket: webSocketServer, actions: actions as any})),
      syncStoreEnhancer({
        socket: webSocketServer,
        keys: ['buckets', 'dashboards'],
      })
    )
  );

  persistStore(store, {storage: nedb({filename: 'db'})});
};
