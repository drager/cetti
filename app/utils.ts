export const createReducer = (actionHandlers, initialState) => {
  return (state = initialState, action) => {
    const reduceFn = actionHandlers[action.type];
    if (!reduceFn) {
      return state;
    }

    return reduceFn(state, action);
  };
};
