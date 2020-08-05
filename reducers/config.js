import { createAction, handleActions } from 'redux-actions';

export const actions = {
  getConfiguration: 'CONFIGURATION/GET',
  setConfiguration: 'CONFIGURATION/SET',
};

export const getConfiguration = createAction(actions.getConfiguration);

const initialState = { config: null };

export default handleActions(
  {
    [actions.setConfiguration]: (state, action) => ({
      ...state,
      config: action.payload,
    }),
  },
  initialState,
);
