import { handleActions } from 'redux-actions';
import { filter } from 'lodash';

export const actions = {
  addToQueue: 'PROFILE/ADD_QUEUE',
  addBatchToQueue: 'PROFILE/ADD_BATCH_QUEUE',
  removeFromQueue: 'PROFILE/REMOVE_QUEUE',
};

const initialState = [];

export default handleActions(
  {
    [actions.addToQueue]: (state, { payload }) => [...new Set([...state, payload])],
    [actions.addBatchToQueue]: (state, { payload }) => [...new Set([...state, ...payload])],
    [actions.removeFromQueue]: (state, { payload }) => filter(state, peerID => peerID !== payload),
  },
  initialState,
);
