import { createAction, handleActions } from 'redux-actions';

export const actions = {
  fetchListings: 'STORE_LISTINGS/FETCH',
  setListings: 'STORE_LISTINGS/SET',
};

export const fetchListings = createAction(actions.fetchListings);

const initialState = {
  listings: [],
  status: '',
};

export default handleActions(
  {
    [actions.fetchListings]: state => ({ ...state, status: 'fetching' }),
    [actions.setListings]: (state, action) => ({ ...state, listings: action.payload, status: 'fectched' }),
  },
  initialState,
);
