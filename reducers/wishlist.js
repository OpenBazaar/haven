import { createAction, handleActions } from 'redux-actions';
import { get } from 'lodash';
import { eventTracker } from '../utils/EventTracker';

export const actions = {
  addWishListing: 'WISHLIST/ADD_WISH_LISTING',
  removeWishListing: 'WISHLIST/REMOVE_WISH_LISTING',
  fetchWishList: 'WISHLIST/FETCH_WISH_LIST',
};

export const addWishListing = createAction(actions.addWishListing);
export const removeWishListing = createAction(actions.removeWishListing);

const initialState = [];

export default handleActions(
  {
    [actions.addWishListing]: (state, action) => {
      eventTracker.trackEvent('Wishlist-AddItem');
      return [action.payload, ...state];
    },
    [actions.removeWishListing]: (state, action) => {
      eventTracker.trackEvent('Wishlist-RemoveItem');
      return state.filter(item => get(item, 'listing.slug') !== action.payload.listing.slug);
    },
  },
  initialState,
);
