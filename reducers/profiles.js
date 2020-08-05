import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchProfiles: 'PROFILES/FETCH_PROFILES',
  setProfiles: 'PROFILES/SET_PROFILES',
};

export const fetchProfiles = createAction(actions.fetchProfiles);

const initialState = {};

export default handleActions(
  {
    [actions.setProfiles]: (state, action) => {
      const newState = { ...state };
      const newArray = action.payload;
      newArray.forEach((profile) => {
        newState[profile.peerID] = profile;
      });
      return newState;
    },
  },
  initialState,
);
