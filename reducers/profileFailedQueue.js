import { handleActions } from 'redux-actions';

export const actions = {
  addToFailedQueue: 'PROFILE/ADD_FAILED_QUEUE',
  removeFromFailedQueue: 'PROFILE/REMOVE_FAILED_QUEUE',
};

const initialState = {};

export default handleActions(
  {
    [actions.addToFailedQueue]: (state, { payload }) => {
      return {
        ...state,
        [payload]: new Date().getTime(),
      };
    },
    [actions.removeFromFailedQueue]: (state, { payload }) => {
      const newState = state;
      delete newState[payload];
      return newState;
    },
  },
  initialState,
);
