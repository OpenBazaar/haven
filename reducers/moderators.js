import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchModerators: 'MODERATORS/FETCH_MODERATORS',
  setModerators: 'MODERATORS/SET_MODERATORS',
};

export const fetchModerators = createAction(actions.fetchModerators);

const initialState = [];

export default handleActions(
  {
    [actions.setModerators]: (state, action) => {
      return action.payload;
    },
  },
  initialState,
);
