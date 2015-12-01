import { Action, createActions } from './helpers';
import { PushData } from '../lib/entites';

export class Actions {
  addData: Action<{data: PushData[]}> = {};
  markAsResolved: Action<{bucket: string, id: string}> = {};
}

export const actions = createActions(Actions);
