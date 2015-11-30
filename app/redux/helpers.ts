import { State, store } from './store';

export function dispatch<T>(action: Action<T>, payload?: T) {
  store.dispatch({type: action.type, payload});
}

export interface ReducerBuilder<S> {
  when<P>(action: Action<P>, handler: (state: S, payload: P) => S): ReducerBuilder<S>;
  build();
}

export function createReducer<S extends {}>(initialState: S): ReducerBuilder<S> {
  const actionHandlers = [];

  return {
    when(action, handler) {
      actionHandlers.push({type: action.type, handler});
      return this;
    },
    build() {
      return (state: S, action) => {
        for (const actionHandler of actionHandlers) {
          if (action.type === actionHandler.type) {
            state = actionHandler.handler(state, action.payload);
          }
        }

        return state || initialState;
      };
    },
  };
}

interface Class<T> {
 new (): T;
}

export function createActions<T>(actionDefinitions: Class<T>): T {
  const actionDef = new actionDefinitions();
  return Object.freeze(
    Object.keys(actionDef).reduce((actions, type) => {
      let actionDefinition = actionDef[type];

      actions[type] = Object.create(actionDefinition);
      actions[type].type = type;
      return actions;
   }, actionDef));
}

export interface Action<T extends {}> {
  type?: string;
  payload?: T;
}

export function stateful(getState: (globalState: State) => Object): ClassDecorator {
  return (target) => {
    return (...args) => {
      const component = new target(...args);
      const {componentWillUnmount} = component;
      let dispose: Function;

      component.componentWillUnmount = componentWillUnmount
        ? (...args) => {
          dispose();
          return componentWillUnmount.apply(component, args);
        }
        : dispose;

      component.state = Object.assign(component.state || {}, getState(store.getState()));
      dispose = store.subscribe(() =>
        component.setState(getState(store.getState())));

      return component;
    };
  };
}
