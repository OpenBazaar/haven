import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchProfile: 'PROFILE/FETCH',
  setProfile: 'PROFILE/SET',
  setProfileLoading: 'PROFILE/SET_LOADING',
  updateProfile: 'PROFILE/UPDATE',
  updateAcceptedCoins: 'PROFILE/UPDATE/ACCEPTED_COINS',
  setProfileFailure: 'PROFILE/SET_FAILURE',
  clearProfileError: 'PROFILE/CLEAR_ERROR',
};

export const fetchProfile = createAction(actions.fetchProfile);
export const setProfile = createAction(actions.setProfile);
export const setProfileLoading = createAction(actions.setProfileLoading);
export const updateProfile = createAction(actions.updateProfile);
export const updateAcceptedCoins = createAction(actions.updateAcceptedCoins);
export const setProfileFailure = createAction(actions.setProfileFailure);
export const clearProfileError = createAction(actions.clearProfileError);

const initialState = {
  data: {
    peerID: '',
    handle: '',
    name: '',
    location: '',
    about: '',
    shortDescription: '',
    nsfw: false,
    vendor: true,
    moderator: false,
    contactInfo: {
      website: '',
      email: '',
      phoneNumber: '',
    },
    colors: {
      primary: 'black',
      secondary: '#FFD700',
      text: 'white',
      highlight: '#123ABC',
      highlightText: '#DEAD00',
    },
    avatarHashes: {},
    headerHashes: {},
    stats: {},
    bitcoinPubkey: '',
    lastModified: '',
    currencies: [],
  },
  loading: false,
  firstUpdate: true,
  profileError: null,
};

export default handleActions(
  {
    [actions.setProfile]: (state, action) => {
      const { data: { currencies }, firstUpdate } = state;
      const { updateCoins } = action.payload;
      let data = {};
      if (firstUpdate) {
        data = action.payload;
      } else {
        if (updateCoins) {
          const { currencies } = action.payload;
          data = { ...state.data, currencies };
        } else {
          data = { ...action.payload, currencies };
        }
      }
      return ({
        ...state,
        data,
        firstUpdate: false,
        loading: false,
      });
    },
    [actions.updateProfile]: state => ({
      ...state,
      loading: true,
    }),
    [actions.setProfileLoading]: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    [actions.setProfileFailure]: (state, action) => ({
      ...state,
      profileError: action.error,
    }),
    [actions.clearProfileError]: state => ({
      ...state,
      profileError: null,
    }),
  },
  initialState,
);
