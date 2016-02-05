import { Action, Class } from './helpers';
import { PushData } from '../lib/entites';

export class Actions {
  addData: Action<{data: PushData[]}> = {};
  markAsResolved: Action<{bucket: string, id: string}> = {};
}

function createActions<T>(actionDefinitions: Class<T>): T {
  const actionDef = new actionDefinitions();
  return Object.freeze(
    Object.keys(actionDef).reduce((actions, type) => {
      let actionDefinition = actionDef[type];

      actions[type] = Object.create(actionDefinition);
      actions[type].type = type;
      return actions;
   }, actionDef));
}

export const actions = createActions(Actions);
