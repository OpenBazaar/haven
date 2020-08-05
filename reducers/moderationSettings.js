import { handleActions, createAction } from 'redux-actions';

export const actions = {
  fetchModerationSettings: 'MODERATION_SETTINGS/FETCH',
  setModerationSettings: 'MODERATION_SETTINGS/SET',
  updateModerationSettings: 'MODERATION_SETTINGS/UPDATE',
  unsetModerationSettings: 'MODERATION_SETTINGS/UNSET',
};

export const fetchModerationSettings = createAction(actions.fetchModerationSettings);
export const updateModerationSettings = createAction(actions.updateModerationSettings);

const initialState = {
  description: '',
  termsAndConditions: '',
  languages: [],
  fee: {},
};

export default handleActions({
  [actions.setModerationSettings]: (state, action) => ({
    ...action.payload,
  }),
  [actions.updateModerationSettings]: (state, action) => ({
    ...action.payload,
  }),
  [actions.unsetModerationSettings]: (state, action) => ({
    ...initialState,
  }),
}, initialState);
