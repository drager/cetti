import { Action, createActions } from './helpers';

export class Actions {
  markAsResolved: Action<{bucket: string, id: string}> = {};
}

export const actions = createActions(Actions);
